/**
 * Created by rogerjason on 8/12/16.
 */
module.exports = {
    entry: './src/less/index.less',
    output: {
        path: './src/styles',
        filename: 'tmp.js'
    },
    module: {
        loaders: [{
            test: /\.less$/,
            loader: "react-native-style-loader!less"
        }]
    }
};

