package com.catbreeds

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class SplashScreenModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SplashScreen"
    }

    @ReactMethod
    fun hide() {
        val activity = reactApplicationContext.currentActivity
        if (activity is MainActivity) {
            activity.hideSplashScreen()
        }
    }
}

