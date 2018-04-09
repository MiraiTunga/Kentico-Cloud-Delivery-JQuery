/*
 * Examples found in main.ja
 * */
function KenticoCloudDeliveryClient(projectId, get_unpublished) {

	const previewUrl = "https://preview-deliver.kenticocloud.com";
	const productionurl = "https://deliver.kenticocloud.com";

	var url = "";

	if (get_unpublished === true) {
		url = previewUrl;
	} else {

        //TODO: add code to allow unpublished items
        // url = productionurl
       url = previewUrl;
       warning("Getting Items Unpublished itesm is not implemented");
	}

	/**
	 * Returns itesm last modified date
	 * @param itemCodeName
	 * @returns {string}
	 */
	this.GetItemLastModifiedDate = function(itemCodeName) {
		return $.ajax({
			type: "GET",
			url: url + "/" + projectId + "/items/" + itemCodeName + "?elements=none",
			dataType: "json"
		}).done(function(data) {
			// console.log("success got " + itemCodeName + " LastModified Date " + data.item.system.last_modified);
			return data.item.system.last_modified;
		}).fail(onRequestError);
	};

	/**
	 * Gets itesm by code name
	 * @param itemCodeName
	 * @returns {promise}
	 */
	this.GetItemByCodeName = function(itemCodeName, depth) {
		var _depth = 0;

		if(depth){
			_depth = depth;
		}

		return $.ajax({
			type: "GET",
			url: url + "/" + projectId + "/items/" + itemCodeName + "?" + _depth,
			dataType: "json"
		}).done(function(data) {
			// console.log("success got " + itemCodeName + " by code name ");
		}).fail(onRequestError);
	};

	/**
	 * Get Irem or items by type
	 * @param type content type
	 * @param options.pagination info.
	 * @param options.pagination.skip
	 * @param options.pagination.limit
	 * @param options.sort
	 * @param options.sort.sortBy
	 * @param options.sort.sortOrder
	 * @returns {promise}
	 */
	this.GetItemsByType = function(type, options) {
		return $.ajax({
			type: "GET",
			url: url + "/" + projectId + "/items?system.type=" + type + BuildPageing(options) + BuildFilter(options) + SortOrder(options),
			dataType: "json"
		}).done(function(data) {
			// console.log("success got items of type:" + type);
			// console.log(url + "/" + projectId + "/items?system.type=" + type + BuildPageing(options) + BuildFilter(options) + SortOrder(options));
		}).fail(onRequestError);
	};


	/**
	 * Get item or items by taxonomy tag/field value
	 * @param {Array.<{taxonomy.taxonomy,taxonomy.tags}>} taxonomy
	 * @param options
	 * @param options.pageination pagination info.
	 * @param options.pageination.skip
	 * @param options.pageination.limit
	 * @param options.sort
	 * @param options.sort.sortBy
	 * @param options.sort.sortOrder
	 * @returns {promise}
	 */
	this.GetItemsByTaxonomyTag = function(taxonomy, options) {


		return $.ajax({
			type: "GET",
			url: url + "/" + projectId + "/items?elements." + BuildTaxonomy(taxonomy) + BuildPageing(options) + BuildFilter(options) + SortOrder(options),
			dataType: "json"
		}).done(function(data) {
			// console.log("success got items of taged:" + JSON.stringify(taxonomy));
		}).fail(onRequestError);


	};

	/**
	 * @return {string}
	 */
	function BuildTaxonomy(taxonomyObject) {

		var taxonomyformat = [];
		// taxonomyformat = taxonomyObject.reduce((arr, taxonomyformat) => [...arr, taxonomyformat, "&elements."], []);
		var taxonomystring = "";

		for (var i = 0; i < taxonomyformat.length - 1; i++) {

			var item = taxonomyformat[i];

			if (item.taxonomy !== undefined) {

				taxonomystring += item.taxonomy + "[any]=" + item.tags;
			} else {
				taxonomystring += item;
			}
		}

		return taxonomystring;
	}

	/**
	 * @return {string}
	 */
	function BuildPageing(optionsObject) {

		if (optionsObject !== undefined && optionsObject.pagination !== undefined && !jQuery.isEmptyObject(optionsObject)) {

			return "&limit=" + optionsObject.pagination.limit + "&skip=" + optionsObject.pagination.skip;
		}
		return "";
	}

	/**
	 * @return {string}
	 */
	function SortOrder(optionsObject) {

		if (optionsObject !== undefined && optionsObject.sort !== undefined && !jQuery.isEmptyObject(optionsObject)) {

			return "&order=" + optionsObject.sort.sortBy + "[" + optionsObject.sort.sortOrder + "]";
		}
		return "";
	}

	/**
	 * @return {string}
	 */

	function BuildFilter(optionsObject) {

		if (optionsObject !== undefined && optionsObject.filter !== undefined && !jQuery.isEmptyObject(optionsObject)) {

			return "&" + optionsObject.filter;
		}

		return "";
	}



	var onRequestError = function(xhr, textStatus, error) {
		// console.log(xhr.statusText);
		// console.log(textStatus);
		// console.log(error);
	};


	function warning(message) {

        console.warn(message);
    }

	this.Helpers = {

		/**
		 * Used for debuging to print out request data
		 * @param data request data
		 */
		LogReturn: function(data) {
			// console.log(data);
			return data;
		},
		GetNextPageUrl: function(data) {

			if (data.pagination.next_page !== undefined && data.pagination.next_page !== "") {

				// console.log("Got next url" + data.pagination.next_page);
			} else {
				// console.warn("No next url" + data.pagination.next_page);
			}
			// console.log(data);
			return data.pagination.next_page;
		},

		SearchModularContent: function(modularContentObject, arrayOfSearchKeys) {

			var content = [];

			for (var key in modularContentObject) {

				for (var j = 0; j < arrayOfSearchKeys.length; j++) {

					if (key == arrayOfSearchKeys[j]) {

						content.push(modularContentObject[key]);
					}
				}
			}

			return {
				items: content
			};
		}

	}

}
