export const useLayout = () => {

  const MAIN_WIDTH = 430
  const MAIN_HEIGHT = "95vh"
  const CONTENT_WIDTH = 400
  const CONTENT_HEIGHT = 150
  const SMALL_CARD_HEIGHT = 120

  const CENTER_CLASS = 'd-flex align-center justify-center '
  const BETWEEN_CLASS = 'd-flex justify-space-between'

  return {
    MAIN_WIDTH,
    MAIN_HEIGHT,
    CONTENT_WIDTH,
    CONTENT_HEIGHT,
    SMALL_CARD_HEIGHT,
    CENTER_CLASS,
    BETWEEN_CLASS
  }
}