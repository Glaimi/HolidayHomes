using Data.Models;
using Data.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Business.Services
{
    public class SanitaryInfoService
    {
        private readonly AccommodationSanitaryInfoRepository _repository;

        public SanitaryInfoService(AccommodationSanitaryInfoRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<AccommodationSanitaryInfo>> GetByAccommodationIdAsync(int accommodationId)
        {
            return await _repository.GetByAccommodationIdAsync(accommodationId);
        }
    }
}