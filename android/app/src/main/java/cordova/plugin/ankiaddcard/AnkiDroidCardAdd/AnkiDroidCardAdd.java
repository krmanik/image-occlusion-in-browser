package cordova.plugin.ankiaddcard.AnkiDroidCardAdd;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.ichi2.anki.api.AddContentApi;

/**
 * This class echoes a string called from JavaScript.
 */
public class AnkiDroidCardAdd extends CordovaPlugin {
    Context context;

    private AnkiDroidHelper mAnkiDroid;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("addCard")) {
            // noteId, noteHeader, origImgSVG, quesImgSVG, noteFooter, noteRemarks, noteSources, noteExtra1, noteExtra2, ansImgSVG, origFile
            String noteData = args.getString(0);
            this.addCard(noteData, callbackContext);
            return true;
        }

        return false;
    }

    private void coolMethod(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void addCard(String noteData, CallbackContext callbackContext) {
        // noteId, noteHeader, origImgSVG, quesImgSVG, noteFooter, noteRemarks, noteSources, noteExtra1, noteExtra2, ansImgSVG, origFile

        context = this.cordova.getActivity().getApplicationContext();

        Long deckId = getDeckId();
        Long modelId = getModelId();

        if ((deckId == null) || (modelId == null)) {
            // we had an API error, report failure and return
            Toast.makeText(context, "AnkiDroid API Error", Toast.LENGTH_LONG).show();
            return;
        }

//        Log.i("deckID", deckId.toString());
//        Log.i("modelId", modelId.toString());
//        Log.i("message", noteData);

        //String[] cardData = {noteId, noteHeader, origImgSVG, quesImgSVG, noteFooter, noteRemarks, noteSources, noteExtra1, noteExtra2, ansImgSVG, origFile};

        // Log.i("card data", Arrays.toString(cardData));

        final AddContentApi api = new AddContentApi(context);

        try {
            JSONObject jsonObject = new JSONObject(noteData);

            if (!(jsonObject == JSONObject.NULL)) {
                String noteId = jsonObject.optString("noteId", "");
                String header  = jsonObject.optString("header", "");

                String origImgSvg  = jsonObject.optString("origImgSvg", "");
                String quesImgSvg  = jsonObject.optString("quesImgSvg", "");

                String footer  = jsonObject.optString("footer", "");
                String remarks  = jsonObject.optString("remarks", "");
                String sources  = jsonObject.optString("sources", "");

                String extra1  = jsonObject.optString("extra1", "");
                String extra2  = jsonObject.optString("extra2", "");

                String ansImgSvg  = jsonObject.optString("ansImgSvg", "");
                String origImg  = jsonObject.optString("origImg", "");


                String[] cardData = {noteId, header, origImgSvg, quesImgSvg, footer, remarks, sources, extra1, extra2, ansImgSvg, origImg};

                api.addNote(modelId, deckId, cardData, null);
                Toast.makeText(context, "Card Added", Toast.LENGTH_SHORT).show();
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private Long getDeckId() {
        mAnkiDroid = new AnkiDroidHelper(context);

        Long did = mAnkiDroid.findDeckIdByName(AnkiDroidConfig.DECK_NAME);
        if (did == null) {
            did = mAnkiDroid.getApi().addNewDeck(AnkiDroidConfig.DECK_NAME);
            mAnkiDroid.storeDeckReference(AnkiDroidConfig.DECK_NAME, did);
        }
        return did;
    }

    private Long getModelId() {
        mAnkiDroid = new AnkiDroidHelper(context);

        Long mid = mAnkiDroid.findModelIdByName(AnkiDroidConfig.MODEL_NAME, AnkiDroidConfig.FIELDS.length);
        if (mid == null) {
            mid = mAnkiDroid.getApi().addNewCustomModel(AnkiDroidConfig.MODEL_NAME, AnkiDroidConfig.FIELDS,
                    AnkiDroidConfig.CARD_NAMES, AnkiDroidConfig.QFMT, AnkiDroidConfig.AFMT, AnkiDroidConfig.CSS, getDeckId(), null);
            mAnkiDroid.storeModelReference(AnkiDroidConfig.MODEL_NAME, mid);
        }
        return mid;
    }
}
