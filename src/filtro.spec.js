const filtro = require("./filtro");
const data = require("./data/data.json");

describe("Filtro", () => {
  describe("Status", () => {
    it("retorna somente os vivos", () => {
      const response = filtro.filterByStatus(data.results, "Alive");

      expect(response.length).toBe(8);
    });

    it("retorna somente os mortos", () => {
      const response = filtro.filterByStatus(data.results, "Dead");

      expect(response.length).toBe(6);
    });

    it("retorna somente os desconhecidos", () => {
      const response = filtro.filterByStatus(data.results, "unknown");

      expect(response.length).toBe(6);
    });
  });

  describe("Sexo", () => {
    it("retorna somente os homens", () => {
      const response = filtro.filterByGender(data.results, "Male");

      expect(response.length).toBe(15);
    });

    it("retorna somente as mulheres", () => {
      const response = filtro.filterByGender(data.results, "Female");

      expect(response.length).toBe(4);
    });
  });

  describe("Episódios", () => {
    it("retorna episode 6 da url", () => {
      const url = "https://rickandmortyapi.com/api/episode/6";

      expect(filtro.getEpisodeFromURL(url)).toBe("6");
    });

    it("retorna um array de números dos episódios", () => {
      const personagem = data.results[6];

      expect(personagem.name).toBe("Abradolf Lincler");
      expect(filtro.generateEpisodeList(personagem)).toEqual(["10", "11"]);
    });

    it("retorna array de episódios", () => {
      /**
       * {
       *  [10]: ['Rick', 'Adolf']
       * }
       */

      const personagem = data.results[6];
      const Rick = data.results[0];
      const episodios = {
        "10": [Rick],
        "11": [Rick],
      };

      const response = filtro.mapCharacterToEpisodes(episodios, personagem);

      expect(response[10].length).toEqual(2);
      expect(response[10][1].name).toEqual(personagem.name);
    });

    it("retorna somente Rick e Morty para o episódio 1", () => {
      const response = filtro.filterByEpisode(data.results, "1");

      expect(response.length).toBe(2);
      expect(response[1].name).toBe("Morty Smith");
    });
  });
});
