QUnit.test('Allow point select with 3D chart (#6094)', function (assert) {
    var chart = Highcharts.chart('container', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                slicedOffset: 25,
                depth: 25,
                animation: false
            }
        },
        series: [{
            data: [2, 4, 6, 1, 3]
        }]
    });

    var point = chart.series[0].points[0];
    function getPos() {
        return point.graphic.element.firstChild.getAttribute('transform');
    }

    var startPos = getPos(),
        clock = TestUtilities.lolexInstall();

    try {
        chart.series[0].points[0].slice();
        TestUtilities.lolexRunAndUninstall(clock);
        assert.notEqual(
            getPos(),
            startPos,
            'Point has moved'
        );
    } finally {
        TestUtilities.lolexUninstall(clock);
    }
});
