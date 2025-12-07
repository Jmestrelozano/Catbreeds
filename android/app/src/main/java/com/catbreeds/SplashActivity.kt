package com.catbreeds

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
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

