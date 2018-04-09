/*KenticoCloudDeliveryClient.js plugin functions Example usage*/

var kenticoCloud = new KenticoCloudDeliveryClient("{PROJECT ID GOES HERE}", false);

kenticoCloud.GetItemLastModifiedDate("hario_mini_mill_slim");
kenticoCloud.GetItemByCodeName("hario_mini_mill_slim").then(AppendToHTML).then(kenticoCloud.Helpers.LogReturn);
kenticoCloud.GetItemByCodeName("hario_mini_mill_slim", 2).then(kenticoCloud.Helpers.LogReturn);

var options3 = {sort: {sortBy: "system.name", sortOrder: "desc"}, filter: "elements.post_date=2014-10-27"};
kenticoCloud.GetItemsByType("article", options3).then(kenticoCloud.Helpers.LogReturn);



var taxonomyFilter = [{taxonomy: "Manufacturer", tags: "hario,Aerobie"}];

kenticoCloud.GetItemsByTaxonomyTag(taxonomyFilter, options1).then(kenticoCloud.Helpers.LogReturn).then(kenticoCloud.Helpers.GetNextPageUrl);

var options2 = {pagination: {skip: 0, limit: 10}, filter: "depth=2&elements.test[contains]=about_us"};
kenticoCloud.GetItemsByTaxonomyTag(taxonomyFilter, options2).then(kenticoCloud.Helpers.LogReturn);

var options1 = {pagination: {skip: 0, limit: 1}, sort: {sortBy: "system.name", sortOrder: "asc"}};
kenticoCloud.GetItemsByTaxonomyTag(taxonomyFilter).then(kenticoCloud.Helpers.LogReturn);
