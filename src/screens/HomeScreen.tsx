import React from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../components/PokemonCard'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { styles } from '../theme/appTheme'

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const { simplePokemonList, loadPokemons } = usePokemonPaginated();

  return (
    <>

      <Image source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG} />


      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={(pokemon => pokemon.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // HEADER DE LA TABLA
          ListHeaderComponent={(
            <Text style={{
              ...styles.title,
              ...styles.globalMargin,
              marginBottom: top + 20,
              top: top + 20,
              paddingBottom: 10,
            }}>Pokedex</Text>
          )}
          renderItem={({ item }) => (
            <PokemonCard pokemon={item} />
          )}
          // INFINITE SCROLL
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          // INDICADOR DE ACTIVIDAD
          ListFooterComponent={<ActivityIndicator style={{ height: 100 }} size={20} color="red" />}

        />
      </View>


    </>
  )
}


