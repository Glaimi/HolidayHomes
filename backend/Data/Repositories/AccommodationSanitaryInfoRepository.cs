using Data.Contexts;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace Data.Repositories
{
    public class AccommodationSanitaryInfoRepository
    {
        private readonly HolidayHomeDbContext _dataContext;

        public AccommodationSanitaryInfoRepository(HolidayHomeDbContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<AccommodationSanitaryInfo>> GetByAccommodationIdAsync(int accommodationId)
        {
            return await _dataContext.AccommodationSanitaryInfos
                .Where(asi => asi.AccommodationId == accommodationId)
                .Include(asi => asi.SanitaryType)
                .ToListAsync();
        }

    }
}
