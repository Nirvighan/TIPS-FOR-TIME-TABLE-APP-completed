import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,Modal,ScrollView ,KeyboardAvoidingView} from 'react-native';
import db from '../Config';
import firebase from 'firebase';
import QuestionnaireScreen from '../Screens/QuestionnaireScreen';
import { Component } from 'react';

export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state = {
         emailId:'',
         password:'',
         isModalVisible:false,
         firstName:'',
         lastName:'',
         contact:'',
         address:'',
         age:'',
        confirmPassword:''
        }
    }


    UserLogin = (emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password).then(()=>{
            
            this.props.navigation.navigate("Questionnaire");
            return Alert.alert("Successfully Login");
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        })
    } 

    UserSignUp = (emailId,password,confirmPassword)=>{
       
        
            firebase.auth().createUserWithEmailAndPassword(emailId,password).then(()=>{
                db.collection('Users').add({
                    firstName:this.state.firstName,
                    lastName:this.state.lastName,
                    contact:this.state.contact,
                    age:this.state.age,
                    address:this.state.address,
                    emailId:this.state.emailId,
                    password:this.state.password
                })
                return Alert.alert("User Added Successfully",
                
                '',
                [
                    {text:'Ok',onPress:()=>this.setState({
                        "isModalVisible":false
                    })}
                ]);

            })
            
    }

    ShowModal = ()=>{
        return(
            <Modal
             animationType = "fade"
             transparent = {true}
             visible = {this.state.isModalVisible}
            >
              <View style = {styles.modalContainer}>
               <ScrollView style = {{width:'100%'}}>
                <KeyboardAvoidingView style = {styles.keyboardAvoidingView}>

                <Text style = {styles.modalTitle}>Sign Up</Text>

                <TextInput
                 style = {styles.formTextInput}
                 placeholder = "First Name"
                 maxLength = {12}
                 onChangeText = {(text)=>{
                     this.setState({
                         firstName:text
                     })
                 }}
                />

<TextInput
                 style = {styles.formTextInput}
                 placeholder = "last Name"
                 maxLength = {12}
                 onChangeText = {(text)=>{
                     this.setState({
                         lastName:text
                     })
                 }}
                />

<TextInput
                 style = {styles.formTextInput}
                 placeholder = "Age"
                 
                 keyboardType = {"numeric"}
                 onChangeText = {(text)=>{
                     this.setState({
                         age:text
                     })
                 }}
                />

<TextInput
                 style = {styles.formTextInput}
                 placeholder = "Contact"
                 maxLength = {10}
                 keyboardType = {'numeric'}
                 onChangeText = {(text)=>{
                     this.setState({
                         contact:text
                     })
                 }}
                />

<TextInput
                 style = {styles.formTextInput}
                 placeholder = "Address"
                 multiline = {true}
                 onChangeText = {(text)=>{
                     this.setState({
                         address:text
                     })
                 }}
                />

<TextInput
                 style = {styles.formTextInput}
                 placeholder = "Email Id"
                 keyboardType = {'email-address'}
                 onChangeText = {(text)=>{
                     this.setState({
                         emailId:text
                     })
                 }}
                />

<TextInput
                 style = {styles.formTextInput}
                 placeholder = "Password"
                 secureTextEntry = {true}
                 onChangeText = {(text)=>{
                     this.setState({
                         password:text
                     })
                 }}
                />

<TextInput
                 style = {styles.formTextInput}
                 placeholder = "Confirm Password"
                 secureTextEntry = {true}
                 onChangeText = {(text)=>{
                     this.setState({
                         confirmPassword:text
                     })
                 }}
                />
                <View style = {styles.modalBackButton}>
                   <TouchableOpacity
                    style = {styles.modalButton}
                    onPress = {()=>{
                        this.UserSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)

                    }}
                   >
                     <Text style = {styles.registerButtontext}>REGISTER</Text>
                   </TouchableOpacity>

                   <TouchableOpacity
                    style = {styles.modalButton}
                    onPress = {()=>{
                        this.setState({
                            isModalVisible:false
                        })

                    }}
                   >
                     <Text style = {styles.registerButtontext}>CANCEL</Text>
                   </TouchableOpacity>
                </View>

                </KeyboardAvoidingView>


               </ScrollView>

              </View>


            </Modal>
             
            
        )
    }
    render(){
        return(
            <View style = {styles.Container}>
                <View style = {{justifyContent:'center',alignItems:'center'}}>

                </View>
                {
                    this.ShowModal()
                }
                <View style = {styles.header}>
                    <Text style = {styles.headerText}>Welcome to TIPS FOR TIME-TABLE App!</Text>
                </View>
                <View style = {styles.loginContainer}>
                    <TextInput
                      placeholder = 'Email ID'
                      keyboardType = "email-address"
                      style = {styles.loginBox}
                      onChangeText = {(text)=>{
                          this.setState({
                              emailId:text
                          })
                      }}
                    />
                    <TextInput
                      placeholder = 'Password'
                      secureTextEntry = {true}
                      style = {styles.loginBox}
                      onChangeText = {(text)=>{
                          this.setState({
                              password:text
                          })
                      }}
                    />
                    <TouchableOpacity
                     style = {styles.button}
                     onPress = {()=>{
                         this.UserLogin(this.state.emailId,this.state.password);
                     }}
                    >
                        <Text style = {styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                     style = {styles.button}
                     onPress = {()=>{
                         this.setState({
                             isModalVisible:true
                         })
                     }}
                    >
                        <Text style = {styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    Container:{
        alignItems:'center',
        backgroundColor:'#FFF176',
        justifyContent:'center',
        flex:1,
        width:'100%',
        height:"100%"
    },
    header:{
        alignItems:'center',
        justifyContent:'center'
    },
    headerText:{
        fontSize:35,
        color:'#1A237E',
        marginTop:30
        
    },
    loginContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    loginBox:{
        width:300,
        height:40,
        marginTop:25,
        borderBottomColor:'#1A237E',
        borderBottomWidth:1.5,
        fontSize:15,
        alignSelf:'center',
        color:'#1A237E'

    },
    buttonText:{
        alignSelf:'center',
        fontWeight:'bold',
        fontSize:15,
        color:'#FFF176'
    },
    button:{
        alignItems:'center',
        alignSelf:'center',
        marginTop:25,
        width:250,
        height:50,
        backgroundColor:'#1A237E',
        justifyContent:'center',
        borderRadius:15,
        borderColor:'#1A237E'
    },
    keyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    modalTitle:{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#FFF176',
        margin:50
    },
    modalContainer:{
        flex:1,
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:20,
        backgroundColor:'#1A237E',
        marginRight:30,
        marginLeft:30,
        marginTop:80,
        marginBottom:80,

    },

    formTextInput:{
        width:'75%',
        height:35,
        marginTop:20,
        borderColor:'#FFF176',
        borderRadius:10,
        borderWidth:1,
        fontSize:15,
        alignSelf:'center',
        color:'#FFF176',
        padding:10
    },
    registerButtontext:{
        color:'#FFF176',
        fontSize:15,
        fontWeight:'bold'
    },
    modalButton:{
        alignItems:'center',
        alignSelf:'center',
        width:200,
        height:40,
        justifyContent:'center',
        borderRadius:10,
        borderWidth:1,
        marginTop:30,
        borderColor:'#FFF176'
    }

})