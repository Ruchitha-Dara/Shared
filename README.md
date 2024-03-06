## **This Repo contains code for calculating the min, max, median heartbeats per minute. Below is the assignment**

## Heart Rate Assignment

### Background:
For a clinical trial, it is required to calculate some statistics for patients' heart rate data. The input “heartrate.json” file contains heart rate measurements collected by a patient over several days. Each measurement consists of beats per minute and timestamps when the measurement was taken (start and end timestamps).

# Problem Statement:
Calculate the minimum, maximum and median beats per minute and the latest data timestamp (timestamp of the last
measurement in the day) for each day. Output should look like this

```json
[
{
"date": "2023-04-28”,
"min": 60,
"max": 119,
"median": 81,
"latestDataTimestamp": "2023-04-28T21:54:00"
},
…..
]
```

The output needs to be written to a file “output.json”.

## **Instructions on Build and Run the Project:**

<!--Ordered List-->
1. Clone the repository:

     git clone "git repository link" (in this case, git clone  https://github.com/Ruchitha-Dara/Shared)

2. Install dependencies:
   
cd "your project folder path"

npm install

4. Prepare your data:

Ensure you have a JSON file named heartrate.json in the project directory.
The heartrate.json file should contain an array of objects, where each object represents a heart rate measurement with the following structure:

```JSON
{
    "beatsPerMinute": "number", 
    "timestamps": {
        "startTime": "YYYY-MM-DDTHH:mm:ss",
        "endTime": "YYYY-MM-DDTHH:mm:ss"
    }
}
```

5. Run the script:

node heart_rate_assessment.js

This will execute the script, process the heartrate.json file, and write the calculated statistics to the output.json file in the same directory.

### **Expected Output:**

The output.json file will contain an array of objects, where each object represents the statistics for a day, with the following properties:

date: String (YYYY-MM-DD)

min: Number (minimum beats per minute)

max: Number (maximum beats per minute)

median: Number (median beats per minute)

latestDataTimestamp: String (timestamp of the last measurement in the day)

