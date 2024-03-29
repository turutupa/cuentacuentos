import _ from 'lodash'
import faker from 'faker';
import React, { Component } from 'react'
import { Search, Responsive } from 'semantic-ui-react'

const source = _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
}))

export default class SearchBar extends Component {
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

    render() {
        const { isLoading, value, results } = this.state

        return (
            // <Grid>
            //     <Grid.Column width={6}>
            <div className='search-bar'>
                <Search

                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                    results={results}
                    value={value}
                    {...this.props}
                />
            </div>
            //     </Grid.Column>
            //     <Grid.Column width={10}>
            //         <Segment>
            //             <Header>State</Header>
            //             <pre style={{ overflowX: 'auto' }}>{JSON.stringify(this.state, null, 2)}</pre>
            //             <Header>Options</Header>
            //             <pre style={{ overflowX: 'auto' }}>{JSON.stringify(source, null, 2)}</pre>
            //         </Segment>
            //     </Grid.Column>
            // </Grid>
        )
    }
}