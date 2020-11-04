import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ImageUploader from "react-images-upload";
import { registerCards } from "../../../services/trello";

export default function LoginForm() {
  const [card, setCard] = useState({});
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = {};
    if (!card.title) {
      error = { ...error, title: "Título obrigatório" };
    } else if (card.title.length < 3) {
      error = { ...errors, title: "Título tem que ter mais de 3 caracteres" };
    }

    if (!card.description) {
      error = { ...error, description: "Descrição é obrigatório" };
    } else if (card.description.length < 3) {
      error = { ...error, description: "Descrição tem que ter mais de 3 caracteres" };
    }

    if (error.description || error.title) {
      setErrors(error);
      return;
    }

    try {
      console.log(card);
      const response = await registerCards(card)
      if (response.ok) {
        await response.json();
        // console.log(res);
        history.replace("/");
      }
    } catch (error) {
      console.log(error);
      setErrors({ msg: "Erro ao cadastrar um card." });
    }
  };

  const onDropImg = (files, picture) => {
    setCard({ ...card, image: files[0], picture: picture[0] });
  };

  const deleteImage = () => {
    setCard({ ...card, image: null, picture: null });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasictitle">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="title"
          placeholder="Digite um título"
          onChange={(e) => setCard({ ...card, title: e.target.value })}
          isInvalid={!!errors.title}
          onFocus={(e) => setErrors({ ...errors, title: null })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicDescriptionription">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          type="description"
          placeholder="Descrição"
          onChange={(e) => setCard({ ...card, description: e.target.value })}
          isInvalid={!!errors.description}
          onFocus={(e) => setErrors({ ...errors, description: null })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicDescriptionription">
        <Form.Label>Imagem</Form.Label>
        {!!card.picture && (
          <div classtitle="fileContainer">
            <div classtitle="uploadPictureContainer" style={{ width: '15%', margin: 0 }}>
              <div
                classtitle="deleteImage"
                onClick={() => deleteImage()}
              >X</div>
              <img src={card.picture} classtitle="uploadPicture" alt="preview" style={{ width: '100%' }} />
            </div>
          </div>
        )}
        <ImageUploader
          singleImage={true}
          withIcon={!card.picture}
          label={!card.picture ? "Selecione uma imagem. Tamanho max. 5mb" : ''}
          buttonText="Seleciona a imagem"
          fileSizeError="arquivo maior que 5mb"
          fileTypeError="não é suportado esse formato de arquivo"
          buttonType="button"
          // withPreview={true}
          onChange={onDropImg}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        />
      </Form.Group>

      {!!errors.msg && <Form.Text>{errors.msg}</Form.Text>}
      <Button variant="primary" type="submit" className="ml-auto">
        Enviar
      </Button>
    </Form>
  );
}
