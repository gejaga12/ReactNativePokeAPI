import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors'

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const [bgColor, setBgColor] = useState('grey')
    const isMounted = useRef(true)
    const navigation = useNavigation();

    const getColors = async (uri: string) => {
        const colors = await ImageColors.getColors(uri, {});
        let primary;
        switch (colors.platform) {
            case 'android':
                primary = colors.dominant;
                break;
            case 'ios':
                primary = colors.background;
            default:
                break;
        }
        setBgColor(primary || 'grey');
        return [primary];
    }

    useEffect(() => {

        if (!isMounted.current) return;

        getColors(pokemon.picture);

        return () => {
            isMounted.current = false
        }
    }, [])

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={ () => navigation.navigate('PokemonScreen', {simplePokemon: pokemon, color: bgColor})}
        >
            <View style={{ ...styles.cardContainer, width: windowWidth * 0.4, backgroundColor: bgColor }}>

                {/* NOMBRE DEL POKEMON */}
                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokebolaContainer}>
                    <Image source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola} />
                </View>

                <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />

            </View>

        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 20,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,

    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10,
    },
    pokebola: {
        height: 100,
        width: 100,
        position: 'absolute',
        right: -25,
        bottom: -25,
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5,
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5,
    }
});