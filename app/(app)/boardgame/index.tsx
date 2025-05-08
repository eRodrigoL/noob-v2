import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
// import { useRouter } from 'expo-router';
import { ButtonHighlight, GameCard, HeaderLayout } from '@components/index';
import { globalStyles } from '@theme/index';
import { images } from '@constants/index'; // {... , ROUTES }
// import SearchBar from '@components/SearchBar'; // Ainda não implementado
import { apiClient } from '@services/apiClient';
import { logger } from '@utils/logger';

// Tipagem da estrutura final utilizada no app
interface Game {
  id: string;
  titulo: string;
  ano?: number;
  capa?: string;
  rating: string;
}

// Tipagem específica da resposta bruta da API (como vem do banco)
interface GameApi {
  _id: string;
  titulo: string;
  ano?: number;
  capa?: string;
}

export default function ListGames() {
  // const router = useRouter();
  const [searchQuery] = useState(''); // Estado para pesquisa (desabilitado por enquanto)
  const [games, setGames] = useState<Game[]>([]); // Lista de jogos tratados
  const [loading, setLoading] = useState(true); // Indica se ainda está carregando
  const [retryCount, setRetryCount] = useState(0); // Contador de tentativas de carregamento
  const MAX_RETRY = 10;

  // Função para buscar os jogos na API
  const fetchData = async () => {
    try {
      const response = await apiClient.get('/jogos');
      const result = (response.data as GameApi[]).map((item) => ({
        id: item._id,
        titulo: item.titulo,
        ano: item.ano,
        capa: item.capa,
        rating: Math.floor(Math.random() * 101) + ' ⭐',
      }));
      setGames(result);
      setLoading(false);
    } catch (err) {
      logger.error('Erro ao buscar jogos:', err);
      if (retryCount < MAX_RETRY) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          fetchData(); // Tenta novamente após 1 segundo
        }, 1000);
      } else {
        setLoading(false);
      }
    }
  };

  // Executa o carregamento inicial ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  // Filtro aplicado sobre os jogos (em breve com SearchBar)
  const filtered = games.filter((g) => g.titulo.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={{ flex: 1 }}>
      <HeaderLayout title="Jogos">
        {/* <SearchBar
        placeholder="Pesquisar jogos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      /> */}

        {loading ? (
          // Exibe o loader enquanto carrega os dados
          <View style={globalStyles.centered}>
            <Image source={images.loading} style={globalStyles.loadingImage} />
            <Text style={globalStyles.textJustified}>Carregando jogos...</Text>
          </View>
        ) : filtered.length > 0 ? (
          // Exibe a lista de jogos em grid 2 colunas
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={globalStyles.container}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <GameCard
                title={item.titulo}
                year={item.ano}
                image={item.capa}
                rating={item.rating}
                onPress={() => ''} // ROUTES.gameProfile(item.id)
              />
            )}
          />
        ) : (
          // Caso nenhum jogo seja encontrado
          <View style={globalStyles.centered}>
            <Text style={globalStyles.textJustified}>Jogo não encontrado. Deseja adicionar?</Text>
            <ButtonHighlight
              title="Adicionar"
              onPress={() => ''} // ROUTES.register
            />
          </View>
        )}
      </HeaderLayout>
    </View>
  );
}
