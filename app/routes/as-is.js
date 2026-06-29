//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.post('/as-is/nino', function (req, res) {
  const nino = req.session.data['nino']

    if (nino == 'ER421111A') {
      res.redirect ('/as-is/exclusions/deceased')
  } else if (nino === 'AA1') {
        res.redirect('/as-is/exclusions/isle-of-man')
  } else {
      res.redirect ('/as-is/route')
  } 
});

router.post('/as-is/choose-option', function (req, res) {
    const option = req.session.data['howCanIHelp']
    const nino = req.session.data['nino']
  
      if (nino === 'LM100000A') {
        res.redirect ('/as-is/forecast-enquiry/forecast-enquiry-rre')
    } else if (nino === 'ER471111A') {
        res.redirect ('/as-is/cope/checking-national-insurance-record')
    } else if (nino === 'LM091111A') {
        res.redirect ('/as-is/forecast-enquiry/lm091111a.html')
    }  else if (option === 'forecast' ) {
        res.redirect ('/as-is/alternative-format')
    } else if (option === 'enquiry') { 
        res.redirect ('/as-is/forecast-enquiry')}
      else {
        //fallback if nothing is selected
        res.redirect ('/as-is/route') }       
});

router.post('/alternative-format', function (req, res) {

  const formatRequired = req.session.data['alternativeFormatRequired']
  const option = req.session.data['alternativeFormat']

  if (formatRequired === 'no') {
    return res.redirect('as-is/forecast-request')
  }

    if (option === 'audio-format') {
      return res.redirect('/as-is/alternative-format/audio-format')
  } else if (option === 'large-print') {
      return res.redirect('/as-is/alternative-format/large-format')
  } else if (option === 'braille') {
      return res.redirect('/as-is/alternative-format/braille')
  } else if (option === 'other-adjustments-requested') {
      return res.redirect('/as-is/alternative-format/other-adjustment-requested')
  } else {
    // fallback if "yes" selected but nothing chosen
      return res.redirect('/as-is/alternative-format')
  }
});

router.post('/own-forecast', function (req, res) {
    const option = req.session.data['own-forecast']

    if (option === 'yes' ) {
        res.redirect ('/as-is/forecast-request/customer')
    }  else if (option === 'no') 
        { res.redirect ('/as-is/forecast-request/3rd-party-recorded')}
     else {
        //fallback if nothing is selected
        res.redirect ('/as-is/forecast-request') }       
});

router.post('/as-is/legal-representation', function (req, res) {
    const option = req.session.data['inSearchlight']

    if (option === 'yes' ) {
        res.redirect ('/as-is/forecast-request/3rd-party-details')
    }  else if (option === 'no') 
        { res.redirect ('/as-is/forecast-request/3rd-party-letter')}
     else {
        //fallback if nothing is selected
        res.redirect ('/as-is/forecast-request/3rd-party-recorded') }       
});

