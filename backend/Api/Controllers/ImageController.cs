using Microsoft.AspNetCore.Mvc;
using Business.Services;
using Microsoft.AspNetCore.Hosting;

namespace Api.Controllers
{
    /// API controller for image-related operations.
    /// Provides endpoints for importing images from the server's images directory.
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly ImageService _imageService;
        private readonly IWebHostEnvironment _env;

        /// The service handling image import logic.
        /// The web hosting environment, used to access the wwwroot path.
        public ImageController(ImageService imageService, IWebHostEnvironment env)
        {
            _imageService = imageService;
            _env = env;
        }

        /// Imports all images from the wwwroot/images directory into the database.    
        [HttpPost]
        [Route("initialImagesImport")]
        public async Task<ActionResult> ImportImagesFromFolderAsync()
        {
            string wwwrootPath = _env.WebRootPath;
            string folderpath = Path.Combine(wwwrootPath, "images");

            if (!string.IsNullOrEmpty(folderpath))
            {
                var result = await _imageService.ImportImagesFromFolderAsync(folderpath);
                return Ok(result);
            }
            else {
                return BadRequest("No Images found");
            }
        }
    } 
}
