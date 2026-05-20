const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

/* HOME */

app.get("/", (req, res) => {

  res.send("Nova Backend Running");

});

/* DOWNLOAD API */

app.get("/download", async (req, res) => {

  const reelUrl = req.query.url;

  if (!reelUrl) {

    return res.json({
      success: false,
      message: "No URL"
    });

  }

  try {

    const options = {

      method: "GET",

      url:
      "https://instagram-scraper-api2.p.rapidapi.com/v1/post_info",

      params: {
        code_or_id_or_url: reelUrl
      },

      headers: {

        "X-RapidAPI-Key":
        "24c94668edmshc1372e2efd40e57p1e6680jsnaad2ea980ecf",

        "X-RapidAPI-Host":
        "instagram-scraper-api2.p.rapidapi.com"

      }

    };

    const response =
    await axios.request(options);

    const reel =
    response.data.data;

    res.json({

      success: true,

      title:
      reel.caption?.text ||
      "Instagram Reel",

      thumbnail:
      reel.thumbnail_url,

      video:
      reel.video_url,

      audio:
      reel.video_url

    });

  } catch (error) {

    console.log(
      error.response?.data ||
      error.message
    );

    res.json({

      success: false,

      message: "API Failed"

    });

  }

});

/* PORT */

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Server Running On Port ${PORT}`
  );

});