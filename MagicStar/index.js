import { AppRegistry } from 'react-native';
import App from './App';
import RootScene from "./src/RootScene";
import NativeUIModule from "./src/iOSComponent/iOSComponentForReact";
// import MineInvitation from "./src/scene/mine/MineInvitation";
var SQLite = require('react-native-sqlite-storage')


AppRegistry.registerComponent('MagicStar', () => App);





