import { takeLatest, call, put, all } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { IRequestLogin, setActiveUser, login } from "../store/Login";
import { setLoading, completeLoad } from "../store/Root";

const basehref = process.env.REACT_APP_BASE_HREF;

export async function loginPromise(request: IRequestLogin) {
  const link = basehref + "login";
  const body = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      email: request.email,
      senha: request.senha,
    }),
  };
  const processDataRequest = await fetch(link, body);
  if (processDataRequest.ok) {
    return await processDataRequest.json();
  } else {
    throw processDataRequest;
  }
}

export function* loginSagaGenerator(request: PayloadAction<IRequestLogin>) {
  yield put(setLoading());
  try {
    const processData = yield call(loginPromise, {
      email: request.payload.email,
      senha: request.payload.senha,
    });
    yield put(setActiveUser(processData));
    yield put(completeLoad());
  } catch (err) {
    yield put(completeLoad("erro ao efetuar o login" + err));
  }
}

export function* loginSaga() {
  yield all([
      takeLatest(login.type, loginSagaGenerator),
    ]);
}
