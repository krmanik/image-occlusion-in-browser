/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package io.infinyte7.ankiimageocclusion;

import android.app.AppComponentFactory;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.webkit.PermissionRequest;
import android.widget.Toast;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        boolean permissionAllowed = true;

        Context context = this.cordovaInterface.getActivity().getApplicationContext();

        final PackageManager pm = context.getPackageManager();
        try {
            PackageInfo packageInfo = pm.getPackageInfo(context.getPackageName(), PackageManager.GET_PERMISSIONS);
            String[] requestedPermissions = packageInfo.requestedPermissions;
            if ( requestedPermissions != null ) {
                for (int i = 0; i < requestedPermissions.length; i++) {
                    if ((packageInfo.requestedPermissionsFlags[i] & PackageInfo.REQUESTED_PERMISSION_GRANTED) == 0) {
                        Toast.makeText(context, "Allow storage and additional permissions from app settings", Toast.LENGTH_LONG).show();
                        permissionAllowed = false;
                        break;
                    }
                }
            }
        }
        catch ( PackageManager.NameNotFoundException e ) {
            Toast.makeText(context, "AnkiDroid not installed.", Toast.LENGTH_LONG).show();
        }

        if (permissionAllowed) {
            // Set by <content src="index.html" /> in config.xml
            loadUrl(launchUrl);
        } else {
            loadUrl("file:///android_asset/www/permissions.html");
        }
    }
}
