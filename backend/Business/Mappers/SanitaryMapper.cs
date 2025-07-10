using System;
using System.Collections.Generic;
using System.Linq;
using Business.Dtos;
using Data.Models;

namespace Business.Mappers
{
    public static class SanitaryMapper
    {
        public static SanitaryDto MapEntityToDto(AccommodationSanitaryInfo entity)
        {
            return new SanitaryDto
            {
                Title = entity.SanitaryType!.Title,
                Amount = entity.Amount
            };
        }

        public static List<SanitaryDto> MapEntityToDto(List<AccommodationSanitaryInfo> entities)
        {
            return entities?.Select(MapEntityToDto).ToList() ?? new List<SanitaryDto>();
        }
    }
}
