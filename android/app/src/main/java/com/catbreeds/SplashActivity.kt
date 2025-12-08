package com.catbreeds

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
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
        
        setContentView(R.layout.launch_screen)
        
        // Wait 2 seconds before starting MainActivity
        Handler(Looper.getMainLooper()).postDelayed({
            // Start MainActivity - it will maintain splash theme
            // until React Native notifies that it's ready
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            finish()
            // Use fade transition to avoid flickering
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out)
        }, 2000) // 2 seconds delay
    }
}

