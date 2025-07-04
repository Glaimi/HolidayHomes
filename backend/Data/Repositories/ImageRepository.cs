using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Repositories
{

    /// Repository for managing image data in the database.
    /// Provides methods to save image information to the database.
    public class ImageRepository
    {
        private HolidayHomeDbContext _dbContext;

        /// Initializes a new instance of the ImageRepository class.
        /// The database context for accessing image data.
        public ImageRepository(HolidayHomeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// Saves an image to the database.
        /// The image's file path and alt text (derived from the file name) are stored.
        /// The AccommodationId is set to null by default.
        public async Task SaveImageAsync(string path, int? accommodationId)
        {
            var image = new Image
            {
                FilePath = path,
                AltText = Path.GetFileNameWithoutExtension(path),
                AccommodationId = accommodationId
            };

            _dbContext.Images.Add(image);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> ImageExistsAsync(string path) { 
            bool doesImageExistsInDatabase = await _dbContext.Images.AnyAsync(img => img.FilePath == path);
            return doesImageExistsInDatabase;
        }
        /// <summary>
        /// Adds a new image to the database.
        /// </summary>
        public async Task AddImageAsync(Image image)
        {
            _dbContext.Images.Add(image);
            await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Gets all images for a specific accommodation.
        /// </summary>
        public async Task<List<Image>> GetImagesByAccommodationIdAsync(int accommodationId)
        {
            return await _dbContext.Images
                .Where(i => i.AccommodationId == accommodationId)
                .ToListAsync();
        }

        /// <summary>
        /// Gets a single image by its ID.
        /// </summary>
        public async Task<Image?> GetImageByIdAsync(int id)
        {
            return await _dbContext.Images.FirstOrDefaultAsync(i => i.Id == id);
        }

        /// <summary>
        /// Deletes an image by its ID.
        /// </summary>
        public async Task DeleteImageByIdAsync(int id)
        {
            var image = await _dbContext.Images.FindAsync(id);
            if (image != null)
            {
                _dbContext.Images.Remove(image);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
