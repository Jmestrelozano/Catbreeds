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
    
    // Enable edge-to-edge display and draw behind system bars
    window.statusBarColor = android.graphics.Color.TRANSPARENT
    window.navigationBarColor = android.graphics.Color.TRANSPARENT
    
    // Make sure content draws behind system bars
    val decorView = window.decorView
    decorView.systemUiVisibility = (
      android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE
      or android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
      or android.view.View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
    )
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
    // Post to ensure decorView is ready
    Handler(Looper.getMainLooper()).post {
      val decorView = window.decorView as? ViewGroup ?: return@post
      
      if (splashView == null && !splashScreenHidden) {
        splashView = layoutInflater.inflate(R.layout.launch_screen, null)
        
        // Configure splash view to ignore system insets completely
        splashView!!.fitsSystemWindows = false
        
        // Remove any padding from the root layout to ensure absolute positioning
        if (splashView is ViewGroup) {
          (splashView as ViewGroup).setPadding(0, 0, 0, 0)
        }
        
        // Use MATCH_PARENT to fill entire screen - this prevents displacement
        val params = FrameLayout.LayoutParams(
          FrameLayout.LayoutParams.MATCH_PARENT,
          FrameLayout.LayoutParams.MATCH_PARENT
        )
        
        // Ensure the splash view completely ignores system window insets
        // This prevents any shifting when system bars are shown/hidden
        ViewCompat.setOnApplyWindowInsetsListener(splashView!!) { view, insets ->
          // Return empty insets to prevent any padding from being applied
          val zeroInsets = Insets.of(0, 0, 0, 0)
          WindowInsetsCompat.Builder()
            .setInsets(WindowInsetsCompat.Type.systemBars(), zeroInsets)
            .setInsets(WindowInsetsCompat.Type.displayCutout(), zeroInsets)
            .setInsets(WindowInsetsCompat.Type.ime(), zeroInsets)
            .build()
        }
        
        // Add splash view directly to decorView at the end to ensure it's on top
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
