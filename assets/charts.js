(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // ===== 图 2：能力维度雷达图 =====
  var radarDom = document.getElementById('chart-radar');
  if (radarDom) {
    var radar = echarts.init(radarDom, null, { renderer: 'svg' });
    radar.setOption({
      animation: false,
      tooltip: { appendToBody: true, trigger: 'item' },
      legend: {
        data: ['lanhu-design-to-html (Skill)', 'lanhu-mcp (MCP)'],
        top: 6,
        textStyle: { color: muted, fontSize: 13 },
        itemGap: 24
      },
      radar: {
        indicator: [
          { name: 'HTML 还原产出', max: 5 },
          { name: '切图本地化', max: 5 },
          { name: '设计参数精度', max: 5 },
          { name: '需求文档分析', max: 5 },
          { name: '团队协作能力', max: 5 },
          { name: '客户端兼容性', max: 5 },
          { name: '部署轻量度', max: 5 },
          { name: 'Token 效率', max: 5 }
        ],
        center: ['50%', '56%'],
        radius: '64%',
        axisName: { color: ink, fontSize: 13, fontWeight: 600 },
        splitLine: { lineStyle: { color: rule } },
        splitArea: { areaStyle: { color: [bg2, 'transparent'] } },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [5, 5, 4.5, 1, 1, 4, 5, 5],
            name: 'lanhu-design-to-html (Skill)',
            areaStyle: { color: accent3 + '33' },
            lineStyle: { color: accent3, width: 2 },
            itemStyle: { color: accent3 }
          },
          {
            value: [3.5, 3, 4, 5, 5, 5, 3, 2],
            name: 'lanhu-mcp (MCP)',
            areaStyle: { color: accent2 + '33' },
            lineStyle: { color: accent2, width: 2 },
            itemStyle: { color: accent2 }
          }
        ]
      }]
    });
    window.addEventListener('resize', function() { radar.resize(); });
  }

  // ===== 图 3：单次还原画板的 Token 消耗估算（堆叠柱状图） =====
  var tokenDom = document.getElementById('chart-token');
  if (tokenDom) {
    var tokenChart = echarts.init(tokenDom, null, { renderer: 'svg' });
    tokenChart.setOption({
      animation: false,
      tooltip: {
        appendToBody: true,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        valueFormatter: function(v) { return v + ' k token'; }
      },
      legend: {
        data: ['文本类（文档/参数/命令输出/HTML）', '图片类（设计图预览/切图预览）'],
        top: 6,
        textStyle: { color: muted, fontSize: 12 },
        itemGap: 20
      },
      grid: { left: '8%', right: '6%', top: '22%', bottom: '12%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['lanhu-design-to-html\n(Skill)', 'lanhu-mcp\n(MCP)'],
        axisLabel: { color: ink, fontSize: 13, fontWeight: 600, lineHeight: 16 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        name: '千 token (k)',
        nameTextStyle: { color: muted, fontSize: 12 },
        axisLabel: { color: muted, fontSize: 12 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } },
        axisLine: { show: false }
      },
      series: [
        {
          name: '文本类（文档/参数/命令输出/HTML）',
          type: 'bar',
          stack: 'total',
          barWidth: '34%',
          itemStyle: { color: accent3, borderRadius: [0, 0, 0, 0] },
          label: { show: true, position: 'inside', color: '#fff', fontWeight: 700, fontSize: 12, formatter: '{c}k' },
          data: [25, 45]
        },
        {
          name: '图片类（设计图预览/切图预览）',
          type: 'bar',
          stack: 'total',
          itemStyle: { color: accent2, borderRadius: [6, 6, 0, 0] },
          label: { show: true, position: 'inside', color: '#fff', fontWeight: 700, fontSize: 12, formatter: '{c}k' },
          data: [0, 60]
        },
        {
          // 总计标签（虚拟系列，仅显示总数）
          name: '总计',
          type: 'bar',
          stack: 'total',
          itemStyle: { color: 'transparent' },
          label: {
            show: true,
            position: 'top',
            color: ink,
            fontWeight: 700,
            fontSize: 13,
            formatter: function(p) {
              var idx = p.dataIndex;
              return idx === 0 ? '约 25k' : '约 105k';
            }
          },
          data: [0, 0]
        }
      ]
    });
    window.addEventListener('resize', function() { tokenChart.resize(); });
  }
})();
