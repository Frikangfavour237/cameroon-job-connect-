package com.kamerwork.services;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class CaptchaService {

    @Value("${recaptcha.secret:6LeJXpksAAAAALFkDcpvugX2KbKrvLy9aKPDdY8-}")
    private String secretKey;

    @Value("${recaptcha.enabled:false}")
    private boolean captchaEnabled;

    public boolean verifyCaptcha(String token) {
        // Skip verification in development if disabled
        if (!captchaEnabled) {
            return true;
        }

        if (token == null || token.isBlank()) {
            return false;
        }

        try {
            String url = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + token;
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setConnectTimeout(5000);
            con.setReadTimeout(5000);

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder response = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            JsonObject json = JsonParser.parseString(response.toString()).getAsJsonObject();
            return json.has("success") && json.get("success").getAsBoolean();
        } catch (IOException e) {
            System.err.println("Captcha verification failed: " + e.getMessage());
            return false;
        }
    }
}