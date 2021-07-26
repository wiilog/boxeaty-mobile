package fr.wiilog.boxeatymobile;

import android.content.pm.ActivityInfo;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
public class ScreenOrientation extends Plugin {

    @PluginMethod()
    public void lockOrientation(PluginCall call) {
        getBridge().getActivity().setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    }

}
