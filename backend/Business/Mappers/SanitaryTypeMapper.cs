using Business.Dtos;
using Business.Services;
using Data.Models;

namespace Business.Mappers
{
    public class SanitaryTypeMapper
    {
        private readonly SanitaryTypeService _sanitaryTypeService;

        public SanitaryTypeMapper(SanitaryTypeService sanitaryTypeService)
        {
            _sanitaryTypeService = sanitaryTypeService;
        }

        public async Task<SanitaryDto> MapEntityToDto(AccommodationSanitaryInfo entity)
        {
            SanitaryType? sanitaryType = await _sanitaryTypeService.GetSanitaryTypeByIdAsync(entity.SanitaryTypeId);

            return new SanitaryDto
            {
                Title = entity.SanitaryType!.Title ?? "",
                Amount = entity.Amount
            };
        }

        public async Task<List<SanitaryDto>> MapEntitiesToDtos(List<AccommodationSanitaryInfo> entities)
        {
            List<SanitaryDto> dtos = [];

            foreach (AccommodationSanitaryInfo entity in entities)
            {
                SanitaryDto dto = await MapEntityToDto(entity);
                dtos.Add(dto);
            }

            return dtos;
        }
    }
}
