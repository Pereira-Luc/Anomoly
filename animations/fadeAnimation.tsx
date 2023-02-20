import {Animated, LayoutAnimation} from "react-native";

const fadeInAnimation = (animationDuration,visible,fadeAnim) => {
        LayoutAnimation.configureNext({
            duration: animationDuration,
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });
        if (visible) {

            Animated.timing(
                fadeAnim,
                {
                    useNativeDriver: true,
                    toValue: 1,
                    duration: animationDuration,
                }
            ).start()
        }else {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: animationDuration,
                    useNativeDriver: true,
                }
            ).start();
        }
    }

export {fadeInAnimation};