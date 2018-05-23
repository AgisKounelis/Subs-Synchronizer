	/* ex.js */
	
	function maxCheck(object)
	{
		if ( parseInt(object.value) > parseInt(object.max) )
			object.value = parseInt(object.max);
	}

		
	function destroyClickedElement(event)
	{
		document.body.removeChild(event.target);
	}
	 
	 
	function loadFileAsText()
	{
		var counter = 1;
		
		var targetHours = parseInt(document.getElementById("targetHours").value);
		var targetMins = parseInt(document.getElementById("targetMins").value);
		var targetSecs = parseInt(document.getElementById("targetSecs").value);
		var targetMili = parseInt(document.getElementById("targetMili").value);
		
		
		var fileToLoad = document.getElementById("fileToLoad").files[0];
		var fileName = fileToLoad.name;
		
		
		var fileReader = new FileReader();
		
		fileReader.onload = function(fileLoadedEvent) 
		{
			
			var textFromFileLoaded = fileLoadedEvent.target.result;
			var lines = textFromFileLoaded.split('\n');	//pinakas me ka8e gramh tou arxeiou txt
			
			
			for(var line = 0; line < lines.length; line++)
			{
				
				if(lines[line]==counter)
				{
					++line;

					lines[line] = newString(lines[line], targetHours, targetMins, targetSecs, targetMili);
					  
					counter++;
				}
			
			}
			

			var textToSaveAsBlob = new Blob(lines, { type: 'plain/text', endings: 'native' });
			var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
			var time = (document.getElementById("clock").innerHTML).substring(0, 8);
			var downloadLink = document.createElement("a");

			downloadLink.download = "EDITED_" + time + "_" + fileName;
			downloadLink.innerHTML = "Download File";
			downloadLink.href = textToSaveAsURL;
			downloadLink.onclick = destroyClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);

			downloadLink.click();
			
			
		};
		
		fileReader.readAsText(fileToLoad, "ISO 8859-7");

	}	
	
	
	function newString(old, targetHours, targetMins, targetSecs, targetMili)
	{

		var hours = parseInt(old.substring(0, 2));	// [ , )
		var mins = parseInt(old.substring(3, 5));
		var secs = parseInt(old.substring(6, 8));
		var mili = parseInt(old.substring(9, 12));
		
		
		if(document.getElementById('add').checked)
			addDelay();
			
		else
			removeDelay();

			
		mili = checkZeroes(mili);
		secs = checkZeroes(secs);
		mins = checkZeroes(mins);
		hours = checkZeroes(hours);
				  
		var first = hours + ":" + mins + ":" + secs + "," + mili + " --> ";
				  
		//=========================================================================
					  
		hours = parseInt(old.substring(17, 19));	// [ , )
		mins = parseInt(old.substring(20, 22));
		secs = parseInt(old.substring(23, 25));
		mili = parseInt(old.substring(26, 29));
		
		if(document.getElementById('add').checked)
			addDelay();
			
		else
			removeDelay();
		
		
		mili = checkZeroes(mili);
		secs = checkZeroes(secs);
		mins = checkZeroes(mins);
		hours = checkZeroes(hours);

		var newStr = first + hours + ":" + mins + ":" + secs + "," + mili + "\n";

		return newStr;

		
		function addDelay()
		{
			hours += targetHours;
			mins += targetMins;
			secs += targetSecs;
			mili += targetMili;

			while(mili>=1000)
			{
				++secs;
				mili -= 1000;
			}

			while(secs>=60)
			{
				++mins;
				secs -= 60;
			}

			while(mins>=60)
			{
				++hours;
				mins -= 60;
			}
		}
		
		
		function removeDelay()
		{
			hours -= targetHours;
			mins -= targetMins;
			secs -= targetSecs;
			mili -= targetMili;

			while(mili<0)
			{
				--secs;
				mili += 1000;
			}

			while(secs<0)
			{
				--mins;
				secs += 60;
			}

			while(mins<0)
			{
				--hours;
				mins += 60;
			}
			
			if(hours<0)
			{
				hours=0;
				mins=0;
				secs=0;
				mili=0;				
			}
			
		}
		
	}
	
	
	function checkZeroes(i) {
		if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
			return i;
	}

					//CLOCK
					
	//===================================================================================
	function startTime() {
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();
		var mo = today.getMonth();
		var year = today.getFullYear();

		var weekday = new Array(7);
		weekday[0] =  "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";
		var day = weekday[today.getDay()];
		
		var mo = new Array();
		mo[0] = "January";
		mo[1] = "February";
		mo[2] = "March";
		mo[3] = "April";
		mo[4] = "May";
		mo[5] = "June";
		mo[6] = "July";
		mo[7] = "August";
		mo[8] = "September";
		mo[9] = "October";
		mo[10] = "November";
		mo[11] = "December";
		var month = mo[today.getMonth()];

		h = checkTime(h);
		m = checkTime(m);
		s = checkTime(s);
		document.getElementById('clock').innerHTML = h + ":" + m + ":" + s + " " + day + " " + month + " " + year;
		var t = setTimeout(startTime, 500);
	}

	function checkTime(i) {
		if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
		return i;
	}
