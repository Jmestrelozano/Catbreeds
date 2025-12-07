package com.catbreeds

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.core.graphics.Insets
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
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
      val decorView = window.decorView as? ViewGroup
      if (decorView != null && splashView == null) {
        splashView = layoutInflater.inflate(R.layout.launch_screen, null)
        
        // Configure splash view to ignore system insets completely
        splashView!!.fitsSystemWindows = false
        
        // Remove any padding from the root layout to ensure absolute positioning
        if (splashView is ViewGroup) {
          (splashView as ViewGroup).setPadding(0, 0, 0, 0)
        }
        
        // Get screen dimensions for absolute positioning
        val displayMetrics = resources.displayMetrics
        val screenWidth = displayMetrics.widthPixels
        val screenHeight = displayMetrics.heightPixels
        
        // Use absolute dimensions to position splash at (0, 0)
        val params = FrameLayout.LayoutParams(
          screenWidth,
          screenHeight
        )
        params.leftMargin = 0
        params.topMargin = 0
        
        // Position splash absolutely at top-left corner
        splashView!!.x = 0f
        splashView!!.y = 0f
        
        // Ensure the splash view completely ignores system window insets
        // This is critical to prevent the view from being shifted down
        ViewCompat.setOnApplyWindowInsetsListener(splashView!!) { view, insets ->
          // Return empty insets to prevent any padding from being applied
          val zeroInsets = Insets.of(0, 0, 0, 0)
          WindowInsetsCompat.Builder()
            .setInsets(WindowInsetsCompat.Type.systemBars(), zeroInsets)
            .setInsets(WindowInsetsCompat.Type.displayCutout(), zeroInsets)
            .setInsets(WindowInsetsCompat.Type.ime(), zeroInsets)
            .build()
        }
        
        // Add splash view directly to decorView - this ensures it's on top of everything
        decorView.addView(splashView, params)
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
