
var convertedData = [];

    function convertData(json) {
        convertedData.push(
        {
            z: json.eventId + "-Q",
            x: json.eventName,
            y: [
                new Date(json.queued).getTime(),
                new Date(json.started).getTime()
            ],
            fillColor: '#fc0022'

        },
    )

        convertedData.push(
{
    z: json.eventId + "-P",
    x: json.eventName,
    y: [
    new Date(json.started).getTime(),
    new Date(json.ended).getTime()
    ],
    fillColor: '#0128f3'

},
    )
}

    var options = {
    series: [
{
    data: [
{
    z: '',
    x: '',
    y: ['', ''
    ]
},
    ]
}
    ],
    chart: {
        animations: {
            enabled: true,
            easing: 'linear',
            speed: 5,
            animateGradually: {
                enabled: true,
                delay: 50
            },
            dynamicAnimation: {
                enabled: true,
                speed: 5
            }
        },
        noData: {
            text: 'Loading...'
        },
    width: 1600,
    height: 800,
    type: 'rangeBar',
    toolbar: {
    show: true,
    offsetX: 0,
    offsetY: 0,
    tools: {
    download: true,
    selection: true,
    zoom: true,
    zoomin: true,
    zoomout: true,
    pan: true,
    reset: false,
    customIcons: [{
    icon: 'R',
    index: 4,
    title: 'Reset',
    class: 'custom-icon',
    click: function () {
    reset();
}
}]
},
    export: {
    csv: {
    filename: undefined,
    columnDelimiter: ',',
    headerCategory: 'category',
    headerValue: 'value',
    dateFormatter(timestamp) {
    return new Date(timestamp).toDateString()
}
},
    svg: {
    filename: undefined,
},
    png: {
    filename: undefined,
}
},
    autoSelected: 'zoom'
},

},
    title: {
    text: "Processes Timeline Chart ",
    align: "center"
},
    plotOptions: {
    bar: {
    horizontal: true
}
},
    xaxis: {
    type: 'datetime',
    labels: {
    formatter: function (value) {
    return moment(value).format("HH:mm:ss.SS");
}

}
},
    tooltip: {
    custom: function (opts) {
    const desc =
    opts.ctx.w.config.series[opts.seriesIndex].data[
    opts.dataPointIndex
    ].z

    const value = opts.ctx.w.config.series[opts.seriesIndex].data[
    opts.dataPointIndex
    ].y

    return '<ul>' +
    '<li><b>event_Id</b>: ' + desc + '  ' + '</li>' +
    '<li><b>Took</b>: ' + (value[1] - value[0]) + 'ms' + '</li>' +
    '</ul>';
}
},
    scales: {
    xAxes: [{
    ticks: {
    fontSize: 12,
    display: true
}
}],
    yAxes: [{
    ticks: {
    fontSize: 12,
    beginAtZero: true
}
}]
},

    grid: {
    show: true,
    strokeDashArray: 5,
    position: 'front',
    xaxis: {
    lines: {
    show: true
}
},
    yaxis: {
    lines: {
    show: true
}
},
},

};

    var chart = new ApexCharts(document.querySelector("#myChart"), options);
    chart.render();

    var chart = new ApexCharts(document.querySelector("#myChart"), options);
    chart.render();
    window.dispatchEvent(new Event('resize'))

getLast()

function getLast() {
    options.series[0].data = [];
    // chart = new ApexCharts(document.querySelector("#myChart"), options);
    chart.render();
    window.dispatchEvent(new Event('resize'))
    fetch("/getLast").then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        data.map(convertData).forEach((e) => {
            var aa = e;
        });
        convertedData.sort((a,b) => (a.y[0] > b.y[0]) ? -1 : ((b.y[0] > a.y[0]) ? 1 : 0))
        console.log(convertedData);
        while(convertedData.length != 0) {
            options.series[0].data.push(convertedData.pop());
            window.dispatchEvent(new Event('resize'))
        }
    });
}

function reset() {
    var chart = new ApexCharts(document.querySelector("#myChart"), options);
    chart.render();

    window.dispatchEvent(new Event('resize'))
}

function getById() {
    let eventId = document.getElementById("numb").value;
    if (eventId == "") {
        alert("Please enter event id number");
        return false;
    }
    options.series[0].data = [];
    chart = new ApexCharts(document.querySelector("#myChart"), options);
    chart.render();
    //
    window.dispatchEvent(new Event('resize'))
    fetch("/event/" + eventId).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);

        data.map(convertData).forEach((e) => {
            var aa = e;
        });
        convertedData.sort((a,b) => (a.y[0] > b.y[0]) ? -1 : ((b.y[0] > a.y[0]) ? 1 : 0))
        console.log(convertedData);
        while(convertedData.length != 0) {
            options.series[0].data.push(convertedData.pop());
            window.dispatchEvent(new Event('resize'))
        }
    });


    // let bb = setInterval(function() {
    //     if (convertedData.length === 0){
    //         clearInterval(bb);
    //         return;
    //     } else {
    //         options.series[0].data.push(convertedData.pop());
    //         window.dispatchEvent(new Event('resize'))
    //         // chart.render();
    //     }
    //
    // }, 200);

}