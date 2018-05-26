function sortAnswers() {
    let container = document.querySelector('#answers-container');
    let answers = container.querySelectorAll('.answer');

    let answers_array = Array.from(answers);
		answers_array = answers_array.sort( function(a,b) {
      let aCorrect = a.classList.contains('border-success');
      let bCorrect = b.classList.contains('border-success');
      if(aCorrect || bCorrect)
        return aCorrect < bCorrect;
      let aValue = parseInt(a.querySelector('.score').innerHTML);
  		let bValue = parseInt(b.querySelector('.score').innerHTML);
  		return aValue < bValue;
    });

    let html = container.firstElementChild.outerHTML;
		for( let i = 0; i < answers_array.length; ++i )
	    html += answers_array[i].outerHTML;
    container.innerHTML = html;
}

module.exports = {
    sortAnswers
};
