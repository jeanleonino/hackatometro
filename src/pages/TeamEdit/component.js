import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Slider from 'material-ui/Slider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Row, Col} from 'reactstrap';
import debounce from 'debounce';

class TeamEdit extends Component {

    constructor(props) {
      super(props);

      this.state = {
        completedValue: 0
      };

      this.save = debounce(this.props.toggleConfirmationDialog.bind(this, true), 500);
    }

    componentWillReceiveProps(nextProps) {
      if ('team' in nextProps && !nextProps.confirmationDialogOpen) {
        this.setState({completedValue: nextProps.team.completed});
      }
    }

    componentDidMount(){
        this.props.watch();
    }

    componentWillUnmount(){
        this.props.unwatch();
    }

    cancel() {
      this.props.toggleConfirmationDialog(false);
      this.setState({completedValue: this.props.team.completed});
    }

    onSliderChange(event, value) {
      this.setState({completedValue: value});
      this.save();
    }

    renderConfirmationDialog() {
      const actions = [
        <FlatButton
          label="Cancelar"
          primary={true}
          onTouchTap={this.cancel.bind(this)}
        />,
        <FlatButton
          label="Confirmar"
          primary={true}
          keyboardFocused={true}
          onTouchTap={() => this.props.setTeamCompletedValue(this.state.completedValue)}
        />,
      ];

      return (
        <div>
          <Dialog
            title="Opaaaaaa"
            actions={actions}
            modal={false}
            open={this.props.confirmationDialogOpen}
            onRequestClose={() => this.props.toggleConfirmationDialog(false)}
          >
            Você tem certeza de quer aplicar estas mudanças?
          </Dialog>
        </div>
      );
    }

    render(){

        if(!this.props.team) return null;

        const { team: { image } } = this.props;

        return (

            <div style={{ padding: '16px' }}>

                <Row>
                <Col md={2}>
                    <Avatar size={160} src={image} />
                </Col>
                <Col md={8}>
                    <h1> Time </h1>
                    <Slider
                      value={this.state.completedValue}
                      min={0}
                      max={100}
                      step={1}
                      onChange={this.onSliderChange.bind(this)}
                      />
                      {this.renderConfirmationDialog()}
                </Col>
                </Row>
            </div>
        );

    }

}

export default TeamEdit;
