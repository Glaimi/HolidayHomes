using Data.Models;
using Data.Repositories;

namespace Business.Services
{
    /// Service for image import and management.
    /// Encapsulates the business logic for importing images from a directory
    /// and delegates saving to the ImageRepository.
    public class ImageService
    {
        private ImageRepository _imageRepository;
        private AccommodationRepository _accommodationRepository;

        /// Creates a new instance of the ImageService.
        /// The repository for image database access.
        public ImageService(ImageRepository imageRepository, AccommodationRepository accommodationRepository) {
            _imageRepository = imageRepository;
            _accommodationRepository = accommodationRepository;
        }

        /// Imports all JPG and PNG images from the specified directory
        /// and saves them to the database.
        public async Task<string> ImportImagesFromFolderAsync(string folderPath)
        {
            // wwwroot-Pfad ermitteln
            var wwwrootPath = Path.GetFullPath(folderPath);
            while (!wwwrootPath.EndsWith("wwwroot") && wwwrootPath.Length > 0)
                wwwrootPath = Path.GetDirectoryName(wwwrootPath);

            var files = Directory.GetFiles(folderPath, "*.*")
                .Where(f => f.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) || f.EndsWith(".png", StringComparison.OrdinalIgnoreCase))
                .ToList();

            var accommodations = await _accommodationRepository.GetAllAccommodationsAsync();
            int count = 0;
            foreach (var file in files)
            {
                // Relativen Pfad ab wwwroot berechnen
                var relativePath = file.Replace(wwwrootPath, "").Replace("\\", "/");
                if (!relativePath.StartsWith("/")) relativePath = "/" + relativePath;

                if (!await _imageRepository.ImageExistsAsync(relativePath))
                {
                    var fileName = Path.GetFileNameWithoutExtension(file);
                    var accommodation = accommodations
                        .FirstOrDefault(a =>
                            !string.IsNullOrEmpty(a.Name) &&
                            fileName.Contains(a.Name, StringComparison.OrdinalIgnoreCase)
                        );
                    int? accommodationId = accommodation?.Id;
                    await _imageRepository.SaveImageAsync(relativePath, accommodationId);
                    count++;
                }
            }
            return $"Es wurden {count} Bilder hochgeladen";
        }            
        

        /// <summary>
        /// Adds a new image for an accommodation.
        /// </summary>
        public async Task AddImageAsync(int accommodationId, string filePath, string altText)
        {
            var image = new Image
            {
                AccommodationId = accommodationId,
                FilePath = filePath,
                AltText = altText
            };
            await _imageRepository.AddImageAsync(image);
        }

        /// <summary>
        /// Gets all images for a specific accommodation.
        /// </summary>
        public async Task<List<Image>> GetImagesByAccommodationIdAsync(int accommodationId)
        {
            return await _imageRepository.GetImagesByAccommodationIdAsync(accommodationId);
        }

        /// <summary>
        /// Gets a single image by its ID.
        /// </summary>
        public async Task<Image?> GetImageByIdAsync(int id)
        {
            return await _imageRepository.GetImageByIdAsync(id);
        }

        /// <summary>
        /// Deletes an image by its ID.
        /// </summary>
        public async Task DeleteImageByIdAsync(int imageId)
        {
            await _imageRepository.DeleteImageByIdAsync(imageId);
        }

        /// <summary>
        /// Assigns images to accommodations based on a mapping.
        /// </summary>
        public async Task<(List<string> Errors, bool Dummy)> AssignImagesToAccommodationsAsync(Dictionary<string, List<string>> mapping)
        {
            var errors = new List<string>();
            var accommodations = await _accommodationRepository.GetAllAccommodationsAsync();
            foreach (var pair in mapping)
            {
                var accommodation = accommodations.FirstOrDefault(a => a.Name == pair.Key);
                if (accommodation == null)
                {
                    errors.Add($"Accommodation not found: {pair.Key}");
                    continue;
                }
                foreach (var fileName in pair.Value)
                {
                    var images = await _imageRepository.GetImagesByAccommodationIdAsync(accommodation.Id);
                    var image = images.FirstOrDefault(i => Path.GetFileName(i.FilePath) == fileName);
                    if (image == null)
                    {
                        errors.Add($"Image not found: {fileName}");
                        continue;
                    }
                    image.AccommodationId = accommodation.Id;
                    await _imageRepository.AddImageAsync(image); // AddImageAsync will update if already tracked
                }
            }
            return (errors, true);
        }

        /// <summary>
        /// Updates an image (e.g., for alt text).
        /// </summary>
        public async Task UpdateImageAsync(Image image)
        {
            await _imageRepository.AddImageAsync(image); // AddImageAsync will update if already tracked
        }

        /// <summary>
        /// Gets all accommodations.
        /// </summary>
        public async Task<List<Accommodation>> GetAllAccommodationsAsync()
        {
            var accommodations = await _accommodationRepository.GetAllAccommodationsAsync();
            return accommodations.ToList();
        }
    }
}
