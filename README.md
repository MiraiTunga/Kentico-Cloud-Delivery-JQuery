# Kentico-Cloud-Delivery-JQuery
A Simple and Straightforward Kentico Cloud Delivery SDK using JavaScript and JQuery only 

A client library for retrieving content from Kentico Cloud that uses JavaScript and JQuery only.


### Example

#### Initializing the KenticoCloudDeliveryClient Objcet and Getting item by code name and appending it to DOM and then logging returned data
```javascript

var kenticoCloud = new KenticoCloudDeliveryClient("{PROJECT ID GOES HERE}", false);

kenticoCloud.GetItemByCodeName("hario_mini_mill_slim").then(AppendToHTML).then(kenticoCloud.Helpers.LogReturn);

function AppendToHTML(data) {
    $("#headline").append(data.item.elements.product_name.value);
    $("#bodytext").append(data.item.elements.long_description.value);
    $("#banner").attr("src", data.item.elements.image.value[0].url);
}
```

## Feedback & Contribution
Feedback & Contributions are welcomed. Feel free to take/start an issue & submit PR.
