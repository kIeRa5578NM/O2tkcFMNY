// 代码生成时间: 2025-08-09 14:23:43
// password_encryption_decryption_tool.js
// This Ember component provides a password encryption and decryption tool.

import { action, computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import Component from '@ember/component';
import { AES, enc } from 'crypto-js';

export default class PasswordEncryptionDecryptionToolComponent extends Component {
  // The password to be encrypted or decrypted.
  @computed get password() {
    return this.args.password;
  }

  // The encryption key.
  @computed get encryptionKey() {
    return this.args.encryptionKey;
  }

  // The result of the encryption or decryption process.
  result = null;

  // Encrypt the password.
  @action
  encrypt() {
    try {
      if (isEmpty(this.password) || isEmpty(this.encryptionKey)) {
        throw new Error('Password and encryption key cannot be empty.');
      }
      const encrypted = AES.encrypt(this.password, this.encryptionKey).toString();
      this.result = htmlSafe(`Encrypted: ${encrypted}`);
    } catch (error) {
      this.result = htmlSafe(`Error: ${error.message}`);
    }
  }

  // Decrypt the password.
  @action
  decrypt() {
    try {
      if (isEmpty(this.password) || isEmpty(this.encryptionKey)) {
        throw new Error('Password and encryption key cannot be empty.');
      }
      const decrypted = AES.decrypt(this.password, this.encryptionKey).toString(enc.Utf8);
      this.result = htmlSafe(`Decrypted: ${decrypted}`);
    } catch (error) {
      this.result = htmlSafe(`Error: ${error.message}`);
    }
  }
}
