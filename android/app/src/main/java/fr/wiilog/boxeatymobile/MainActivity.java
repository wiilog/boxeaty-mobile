package fr.wiilog.boxeatymobile;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

import com.dutchconcepts.capacitor.barcodescanner.BarcodeScanner;
import com.capacitorjs.plugins.storage.StoragePlugin;
import com.getcapacitor.community.database.sqlite.CapacitorSQLitePlugin;
import com.hemangkumar.capacitorgooglemaps.CapacitorGoogleMaps;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            add(BarcodeScanner.class);
            add(ScreenOrientation.class);
            add(StoragePlugin.class);
            add(CapacitorSQLitePlugin.class);
            add(CapacitorGoogleMaps.class);
        }});
    }
}
