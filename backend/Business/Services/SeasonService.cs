using Business.Dtos;
using Business.Mappers;
using Data.Models;
using Data.Repositories;

namespace Business.Services;

public class SeasonService
{
    private readonly SeasonRepository _seasonRepository;
    private readonly SeasonMapper _seasonMapper;

    public SeasonService(SeasonRepository seasonRepository, SeasonMapper seasonMapper)
    {
        _seasonRepository = seasonRepository;
        _seasonMapper = seasonMapper;
    }

    public async Task<List<SeasonDto>> GetAllSeasons()
    {
        List<Season> seasons = await _seasonRepository.GetAllSeasons();
        List<SeasonDto> dtos = [];

        foreach (Season season in seasons)
        {
            dtos.Add(_seasonMapper.EntityToDto(season));
        }

        return dtos;
    }
}