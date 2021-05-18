module.exports = function getHeaderContent(langObj) {
  return `
<ul>
  <li>
    <a href="${getLangHref()}/" data-navigo>${langObj.menu.about}<span> PlantBuddies</span></a
    ><span>💘</span>
  </li>
  <li><a href="${getLangHref()}/🌿" data-navigo>${langObj.menu.overview}</a><span>🌿</span></li>
  <li id="lang-menu">
    <select
      aria-label="Change Language"
      class="lang-select fc"
      name="lang-select"
      id="lang-select"
    >
      <option value="_change">Language 🏳️‍🌈</option>
      <option value="de">DE</option>
      <option value="en">EN</option>
    </select>
  </li>
</ul>
`
}
