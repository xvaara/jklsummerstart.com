function onEdit(e) {
  Logger.log(e)
  const source = SpreadsheetApp.getActive()
  let s = source.getSheets()[1]
  Logger.log(source.getSheets().map(s => s.getName()))
  let data = s.getDataRange().getValues()
  let timetable = []
  let teams = []
  let slots = []
  let curslot
  let curlevel
  let meta = {}
  // Logger.log(JSON.stringify(data))
  for (let i = 1; i < data.length; i++) {
    const row = data[i]

    if ((row[12]) || (row[13]) || (row[14])) {
      if ((!row[12]) && (row[13])) {
        curslot = row[13]
        curslot = slots.push({ name: row[13], rows: [], notes: [] }) - 1
      }
      else if ((!row[12]) && (!row[13]) && row[14]) {
        slots[curslot].notes.push((row[14]))
      }
      else {
        slots[curslot].rows.push({
          a: row[12],
          b: row[13],
          c: row[14],
          d: row[15],
          e: row[16],
          f: row[17],

        })
      }
    }

    if (row[0] === 'ign') { continue }

    if (row[21] && i < 30) {
      if (!teams.includes(row[21]))
        teams.push(row[21])
    }

    if (row[0] === 'day') {
      // Logger.log(JSON.stringify({t: 'day', i: row[2], d: new Date(row[2])}))
      curlevel = timetable.push({ name: row[5], date: new Date(row[2]), rows: [] }) - 1
      continue
    }
    if (row[0] === 'info') {
      // Logger.log(JSON.stringify({t: 'info', i: row[2], d: new Date(row[2])}))
      timetable[curlevel].rows.push({
        type: 'info',
        place: row[1],
        time: row[2],
        text: row[3],
      })
    }
    if (row[0] === 'game' || (row[0] === '' && row[1] && row[2] && row[4] && row[7] && row[9])) {
      // Logger.log(JSON.stringify({i: row[2], d: new Date(row[2])}))
      timetable[curlevel].rows.push({
        type: 'game',
        field: row[1],
        time: row[2],
        pool1: row[3],
        team1: row[4],
        score1: row[5],
        score2: row[6],
        team2: row[7],
        pool2: row[8],
        num: row[9],
        pool: row[10],
        link: row[22],
      })
    }
    if (row[0] === 'meta' && row[1] && row[2]) {
      meta[row[1]] = row[2]
    }
  }
  // teams = teams.sort;

  let srules = source.getSheets()[0]
  let rules = srules.getDataRange().getValues()

  let out = { timetable, slots, teams: teams.sort(), rules, meta }

  // Logger.log(JSON.stringify(out));

  let token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNkZjVmYWFlLWY0ZDktNDE2NS1hNzUxLTZkZGRhY2U0OTljOCIsIm5hbWVzcGFjZV9pZCI6bnVsbCwiZG9tYWluX2lkIjoiMTAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwibmFtZSI6IkpTUyBhZG1pbiIsImVtYWlsIjoidGVrbmlpa2thQHNsZWVwd2Fsa2Vycy5maSIsImRhdGEiOm51bGwsImFkbWluIjpmYWxzZSwiY3JlYXRlIjpbInVzZXIve2lkfS8qKiIsImpzcy8qKiJdLCJyZWFkIjpbInVzZXIve2lkfS8qKiIsImpzcy8qKiJdLCJ1cGRhdGUiOlsidXNlci97aWR9LyoqIiwianNzLyoqIl0sImRlbGV0ZSI6WyJ1c2VyL3tpZH0vKioiLCJqc3MvKioiXSwiY3JlYXRlZF9hdCI6IjIwMjUtMDYtMDVUMTI6NTY6MTIuNzE4WiIsInVwZGF0ZWRfYXQiOiIyMDI1LTA2LTA1VDEyOjU3OjQ3LjY1M1oiLCJpYXQiOjE3NDkxMjgzMjMsImlzcyI6InVybjpleGFtcGxlOmlzc3VlciIsImF1ZCI6InVybjpleGFtcGxlOmF1ZGllbmNlIiwiZXhwIjoxNzYyMDg4MzIzfQ.Ac-i9j4trdYqUgQNg9w15oUspS-9tEWCAXIcJpYHigA'
  // Set a comment on the edited cell to indicate when it was changed.
  let response = UrlFetchApp.fetch(`https://data.mhx.fi/jss/data?token=${token}`, { method: 'POST', payload: JSON.stringify(out), contentType: 'application/json' })
  Logger.log(response)
}
