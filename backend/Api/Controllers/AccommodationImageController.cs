using Microsoft.AspNetCore.Mvc;
using Business.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Hosting;

namespace Api.Controllers
{
    /// <summary>
    /// Provides endpoints for managing images of accommodations.
    /// </summary>
    [ApiController]
    [Route("api/accommodations/{accommodationId}/images")]
    public class AccommodationImageController : ControllerBase
    {
        private readonly ImageService _imageService;
        private readonly IAccommodationService _accommodationService;
        private readonly IWebHostEnvironment _env;

        public AccommodationImageController(ImageService imageService, IAccommodationService accommodationService, IWebHostEnvironment env)
        {
            _imageService = imageService;
            _accommodationService = accommodationService;
            _env = env;
        }

        /// <summary>
        /// Retrieves all image metadata for a given accommodation, including image ID, accommodation name, alt text, and image URL.
        /// </summary>
        /// <param name="accommodationId">The unique identifier of the accommodation whose images should be retrieved.</param>
        /// <returns>
        /// An <see cref="IActionResult"/> containing a list of image metadata objects. Returns 200 OK with the list, or 404 NotFound if the accommodation does not exist.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetImages(int accommodationId)
        {
            var request = HttpContext.Request;
            var baseUrl = $"{request.Scheme}://{request.Host}";
            var images = await _imageService.GetImagesByAccommodationIdAsync(accommodationId);
            var accommodationName = await _accommodationService.GetAccommodationNameByIdAsync(accommodationId);
            var result = images.Select(img => new
            {
                id = img.Id,
                accommodationId = img.AccommodationId,
                accommodationName,
                altText = img.AltText,
                url = !string.IsNullOrEmpty(img.FilePath) && img.FilePath.StartsWith("/images")
                    ? baseUrl + img.FilePath
                    : $"/api/images/{img.Id}"
            }).ToList();
            return Ok(result);
        }

        /// <summary>
        /// Uploads a new image for a specific accommodation. Only JPG and PNG files up to 5MB are allowed.
        /// </summary>
        /// <param name="accommodationId">The ID of the accommodation to which the image will be added.</param>
        /// <param name="file">The image file to upload (JPG or PNG, max 5MB).</param>
        /// <param name="altText">Optional alt text for the image, used for accessibility and SEO.</param>
        /// <returns>
        /// An <see cref="IActionResult"/> containing the metadata of the newly created image. Returns 400 BadRequest if the file is invalid.
        /// </returns>
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(int accommodationId, [FromForm] IFormFile file, [FromForm] string? altText)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(ext))
                return BadRequest("Invalid file type. Only jpg and png allowed.");
            if (file.Length > 5 * 1024 * 1024)
                return BadRequest("File too large. Max 5MB.");

            var uploadsFolder = Path.Combine(_env.WebRootPath, "images", $"accommodation_{accommodationId}");
            Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var wwwrootPath = _env.WebRootPath;
            var relativePath = filePath.Replace(wwwrootPath, "").Replace("\\", "/");
            if (!relativePath.StartsWith("/")) relativePath = "/" + relativePath;

            await _imageService.AddImageAsync(accommodationId, relativePath, altText ?? Path.GetFileNameWithoutExtension(file.FileName));
            var images = await _imageService.GetImagesByAccommodationIdAsync(accommodationId);
            var image = images.OrderByDescending(i => i.Id).FirstOrDefault(i => i.FilePath == relativePath);
            var accommodationName = await _accommodationService.GetAccommodationNameByIdAsync(accommodationId);
            return Ok(new
            {
                id = image?.Id,
                accommodationId,
                accommodationName
            });
        }

        /// <summary>
        /// Deletes an image by its ID and removes the file from disk.
        /// </summary>
        /// <param name="imageId">The ID of the image to delete.</param>
        /// <returns>
        /// An <see cref="IActionResult"/> indicating success or failure. Returns 404 NotFound if the image does not exist.
        /// </returns>
        [HttpDelete("/api/images/{imageId}")]
        public async Task<IActionResult> DeleteImage(int imageId)
        {
            var image = await _imageService.GetImageByIdAsync(imageId);
            if (image == null)
                return NotFound();
            if (!string.IsNullOrEmpty(image.FilePath) && System.IO.File.Exists(image.FilePath))
                System.IO.File.Delete(image.FilePath);
            await _imageService.DeleteImageByIdAsync(imageId);
            return Ok();
        }

        /// <summary>
        /// Assigns images to accommodations based on a mapping from accommodation names to image file names.
        /// </summary>
        /// <param name="mapping">
        /// A dictionary mapping accommodation names to lists of image file names. Example: { "Haus A": ["bild1.jpg", "bild2.jpg"] }
        /// </param>
        /// <returns>
        /// An <see cref="IActionResult"/> indicating the result of the assignment. Returns 400 BadRequest if assignments fail.
        /// </returns>
        [HttpPost("/api/accommodations/assign-images")]
        public async Task<IActionResult> AssignImagesToAccommodations([FromBody] Dictionary<string, List<string>> mapping)
        {
            var result = await _imageService.AssignImagesToAccommodationsAsync(mapping);
            if (result.Errors.Count > 0)
                return BadRequest(new { message = "Some assignments failed", errors = result.Errors });
            return Ok("Zuordnung abgeschlossen.");
        }

        /// <summary>
        /// Updates the alt text of an image.
        /// </summary>
        /// <param name="imageId">The ID of the image to update.</param>
        /// <param name="dto">An object containing the new alt text.</param>
        /// <returns>
        /// An <see cref="IActionResult"/> indicating success or failure. Returns 404 NotFound if the image does not exist.
        /// </returns>
        [HttpPut("/api/images/{imageId}/alttext")]
        public async Task<IActionResult> UpdateAltText(int imageId, [FromBody] AltTextUpdateDto dto)
        {
            var image = await _imageService.GetImageByIdAsync(imageId);
            if (image == null)
                return NotFound();
            image.AltText = dto.AltText;
            await _imageService.UpdateImageAsync(image);
            return Ok();
        }

        /// <summary>
        /// Returns all accommodations with their IDs and names for assignment purposes (e.g., for dropdowns in the frontend).
        /// </summary>
        /// <returns>
        /// An <see cref="IActionResult"/> containing a list of accommodations (ID and name).
        /// </returns>
        [HttpGet("/api/accommodations/assignable")]
        public async Task<IActionResult> GetAssignableAccommodations()
        {
            var accommodations = await _imageService.GetAllAccommodationsAsync();
            var result = accommodations.Select(a => new { id = a.Id, name = a.Name }).ToList();
            return Ok(result);
        }
    }

    public class AltTextUpdateDto
    {
        public string AltText { get; set; }
    }
}
