
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const people = require('../../data/personalDetails.json')

router.post('/redesign/v1/find-nino', function (req, res) {

    delete req.session.data.ninoError

    const niNumber = (req.session.data['national-insurance-number'] || '')
        .replace(/\s/g, '')
        .toUpperCase()

    const person = people[niNumber]

    if (person) {

        delete req.session.data.ninoError

        req.session.data.person = person

        if (person.journey === 'forecast-enquiry/forecast-enquiry-rre') {
            return res.redirect('/redesign/v1/forecast-enquiry/forecast-enquiry-rre')
        }

        if (person.journey === 'cope/checking-national-insurance-record') {
            return res.redirect('/redesign/v1/cope/checking-national-insurance-record')
        }

        if (person.journey === 'exclusions/isle-of-man') {
            return res.redirect('/redesign/v1/exclusions/isle-of-man')
        }

        if (person.journey === 'exclusions/deceased') {
            return res.redirect('/redesign/v1/exclusions/deceased')
        }

        return res.redirect('/redesign/v1/route')

    }

    delete req.session.data.person

    req.session.data.ninoError =
        'We cannot find a record for the National Insurance number you entered'

    return res.redirect('/redesign/v1/nino')

})

    router.post ('/redesign/v1/choose-option', function (req, res)  {
        const option = req.session.data['howCanIHelp']
        if (option === 'forecast') {
            res.redirect ('alternative-format')
        } else if (option === 'enquiry') {
            res.redirect ('forecast-enquiry/overview')
        }
    });

router.post('/redesign/v1/alternative-format', function (req, res) {
  const formatRequired = req.session.data['alternativeFormatRequired']
  const option = req.session.data['alternativeFormat']

  if (formatRequired === 'no') {
    return res.redirect('forecast-enquiry')
  }

    if (option === 'audio-format') {
      return res.redirect('alternative-format/audio-format')
  } else if (option === 'large-print') {
      return res.redirect('alternative-format/large-format')
  } else if (option === 'braille') {
      return res.redirect('alternative-format/braille')
  } else if (option === 'other-adjustments-requested') {
      return res.redirect('alternative-format/other-adjustment-requested')
  } else {
    // fallback if "yes" selected but nothing chosen
      return res.redirect('alternative-format')
  }
});


router.post(
  '/redesign/v1/forecast-enquiry/change-stop-contributions',
  function (req, res) {

    const scenario = req.session.data.niStopScenario

    let stopDate

    if (scenario === 'spa') {

      const spaDate =
        req.session.data.person.personalDetails.statePensionDate

      stopDate = spaDate.split(' ').slice(1).join(' ')

    } else if (scenario === 'before-spa') {

      const months = [
        'January','February','March','April',
        'May','June','July','August',
        'September','October','November','December'
      ]

      stopDate =
        `${months[Number(req.session.data.stopMonth) - 1]} ${req.session.data.stopYear}`

    } else if (scenario === 'already-stopped') {

      const today = new Date()

      const months = [
        'January','February','March','April',
        'May','June','July','August',
        'September','October','November','December'
      ]

      stopDate =
        `${months[today.getMonth()]} ${today.getFullYear()}`
    }

    req.session.data.stopDate = stopDate

    res.redirect('/redesign/v1/forecast-enquiry/improve-state-pension')

  }
)