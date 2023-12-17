
# --scene--

```json
{
  "setup": {
    "background": "company1-reception.png",
    "characters": [
      {
        "character": "Jake",
        "position": {"x":50,"y":0,"z":1.4},
        "opacity": 0
      }
    ],
    "audio": {
      "filename": "1.1-5.mp3",
      "startTime": 1,
      "startTimestamp": 0.00,
      "finishTimestamp": 3.94
    }
  },
  "commands": [
    {
      "character": "Jake",
      "opacity": 1,
      "startTime": 0
    },
    {
      "character": "Jake",
      "startTime": 1,
      "finishTime": 4.94,
      "dialogue": {
        "text": "Hey. You're Sarah, right? I'm Jake, from Security.",
        "align": "center"
      }
    },
    {
      "character": "Jake",
      "opacity": 0,
      "startTime": 5.44
    }
  ]
}
```
