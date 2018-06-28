const React = require('react');
const parse = require('bibtex-parser')

const citationCache = {};
const cite = (label) => {
  return citationCache[label.toUpperCase()];
}

// need to load in .bib file directly as a string
let bibliography = "@inproceedings{test1,\
 author = {Lysenko, Mikola and Nelaturi, Saigopal and Shapiro, Vadim},\
 title = {Group morphology with convolution algebras},\
 booktitle = {Proceedings of the 14th ACM Symposium on Solid and Physical Modeling},\
 series = {SPM '10},\
 year = {2010},\
 isbn = {978-1-60558-984-8},\
 location = {Haifa, Israel},\
 pages = {11--22},\
 numpages = {12},\
 url = {http://doi.acm.org/10.1145/1839778.1839781},\
 doi = {10.1145/1839778.1839781},\
 acmid = {1839781},\
 publisher = {ACM},\
 address = {New York, NY, USA},\
}\
@inproceedings{test2, \
  author = { Lysenko, Mikola and Nelaturi, Saigopal and Shapiro, Vadim}, \
  title = { Group morphology with convolution algebras}, \
  booktitle = { Proceedings of the 14th ACM Symposium on Solid and Physical Modeling }, \
  series = {\
    SPM '10},\
 year = {2010},\
 isbn = {978-1-60558-984-8},\
 location = {Haifa, Israel},\
 pages = {11--22},\
 numpages = {12},\
 url = {http://doi.acm.org/10.1145/1839778.1839781},\
 doi = {10.1145/1839778.1839781},\
 acmid = {1839781},\
 publisher = {ACM},\
 address = {New York, NY, USA},\
}";

const parsedBib = parse(bibliography);

Object.keys(parsedBib).forEach((key, i) => {
  citationCache[key.toUpperCase()] = i + 1;
});

class References extends React.Component {

  createReference(reference, i) {
    return (
      <li id={`reference-${i + 1}`} key={reference.TITLE}>
        <strong>{reference.TITLE}.</strong>
        <br />
        {reference.AUTHOR}.
        <br />
        <i>{reference.BOOKTITLE}. {reference.LOCATION}, {reference.YEAR}.</i>
      </li>
    )
  }

  createReferences() {
    return Object.keys(parsedBib)
      .map((key, i) => {
        const reference = parsedBib[key];
        return this.createReference(reference, i);
      });
  };

  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    return (
      <div {...props}>
        <h3>References</h3>
        <ol>
          {this.createReferences()}
        </ol>
      </div>
    );
  }
}

References.cite = cite;

module.exports = References;
