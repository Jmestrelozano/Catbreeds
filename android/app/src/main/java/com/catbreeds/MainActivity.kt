package com.catbreeds

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {
  
  private var splashScreenHidden = false
  private var splashView: View? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    // Keep SplashTheme initially to maintain splash screen appearance
    // This prevents flickering when transitioning from SplashActivity
    setTheme(R.style.SplashTheme)
    super.onCreate(savedInstanceState)
  }

  override fun onPostCreate(savedInstanceState: Bundle?) {
    super.onPostCreate(savedInstanceState)
    // Show splash screen layout after ReactActivity is initialized
    showSplashScreen()
  }

  /**
   * Shows the splash screen overlay
   */
  private fun showSplashScreen() {
    Handler(Looper.getMainLooper()).post {
      val rootView = window.decorView.rootView as? ViewGroup
      if (rootView != null && splashView == null) {
        splashView = layoutInflater.inflate(R.layout.launch_screen, null)
        val params = FrameLayout.LayoutParams(
          FrameLayout.LayoutParams.MATCH_PARENT,
          FrameLayout.LayoutParams.MATCH_PARENT
        )
        rootView.addView(splashView, params)
      }
    }
  }

  /**
   * Hides the splash screen
   * Called from JavaScript when React Native is ready
   */
  fun hideSplashScreen() {
    if (!splashScreenHidden) {
      splashScreenHidden = true
      // Remove splash view from UI thread
      Handler(Looper.getMainLooper()).post {
        splashView?.let { view ->
          val parent = view.parent as? ViewGroup
          parent?.removeView(view)
          splashView = null
        }
      }
    }
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Catbreeds"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
