//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {

  const table = document.querySelector(
    '[data-module="moj-sortable-table"]'
  )

  if (
    window.MOJFrontend &&
    window.MOJFrontend.SortableTable &&
    table
  ) {

    new window.MOJFrontend.SortableTable({
      table
    })

  } else {

    console.log('MOJ SortableTable not loaded')

  }

})