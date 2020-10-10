import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,Modal,ScrollView ,KeyboardAvoidingView} from 'react-native';
import db from '../Config';
import firebase from 'firebase';

export default class ResultScreen extends React.Component{

    
    

   

    render(){
    
        return(
            <View style = {styles.Container}>
                <Text style = {styles.heading}>As per your information I think this is the best tips to make a Time-Table for your self study</Text>

                <Text style = {styles.subHeading}>You should always study 7 days in a week.</Text>
                <Text style = {styles.subHeading}>You should atleast do self study for a minimum 2 hours daily.</Text>
                <Text style = {styles.subHeading}>You should give more time to those subjects which you feel should are less performing in those subjects.</Text>
                <Text style = {styles.subHeading}>You should also take breaks every 45 mins.</Text>
                <Text style = {styles.subHeading}>You should try to study early morning the tough subjects because at that time your brain is more active</Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        color:'#1A237E',
        backgroundColor:'#FFF176',
        justifyContent:'center'
    },
    heading:{
        fontSize:30,
        color:'#1A237E',
        marginBottom:50
    },
    subHeading:{
        fontSize:25,
        fontWeight:'bold',
        color:'#1A237E',
        marginTop:30
    }
})