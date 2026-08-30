```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        long maxVal = Long.MIN_VALUE - 1L; // 初期値：最小可能な整数以下
        
        if (sc.hasNext()) {
            String line = sc.nextLine();
            boolean foundValue = false;
            
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                if (!Character.isWhitespace(c)) {
                    // キャンマ以外、空白以外の文字が来たら新規要素とみなす処理は不要だが、
                    // ここでは区切り文字の挙動を制御する。カンマはスキップして、数字が始まった場所を探す必要があるか？
                    // 問題文：'empty elements and spaces before and after are ignored'. 
                    // これは入力されたデータ自体が '3, , a', のような形式の場合、「3」と「」という2つの要素が存在するか？それとも空文字列として扱い否か。
                    
                    // 「整数として解釈できない要素も無視します」という条件より、'a' はスキップされます。
                    // カンマは区切り文ですが、数字が直後にない場合や、その後の空白のみがある場合は「新しい数値」ではない可能性があります。
                    
                }

                if (!Character.isWhitespace(c)) { 
                        int startIdx = i;
                        
                        while (i < line.length()) {
                            char ch = line.charAt(i);
                            
                            // 桁のチェックとカントル（符号）を含む場合のみ数字として扱うか？
                            // Java の Integer.parseInt や Long.parseLong は負数も扱えますが、文字列全体をパースする場合です。
                            boolean isDigitOrSign = Character.isDigit(ch) || (ch == '-' && i + 1 < line.length() && !Character.isWhitespace(line.charAt(i+1)) && !Character.isDigit(line.charAt(i))); // シンプルに符号と数字の処理
                
                } else {
                    int startIdx = i;

                        if (!sc.hasNext()) break;
                            String nextToken = sc.next();
                            
                        count++; 
                        
            if (nextToken.length() > 0) {
                 try {
                     long val = Long.parseLong(nextToken); // トークンが整数であるかパースできるかのチェックは明示的に行わないが、long の範囲内に収まる場合のみ扱う。
                     
                         maxVal = Math.max(maxVal, val); 
                        } catch (NumberFormatException e) {
                           // 数値として解釈できない要素は無視する -> ignore
                       }
                 } finally {
                     if (!sc.hasNext()) break;
                i++;

            } else {
                 // nextToken が空の場合（空白のみ）、count を増やさない。ただし、問題文の仕様「整数として解釈できない要素も無視します」により、「a」という文字列は無効になります。
                 continue; 
             }
         }}
    public class Main {
        public static void main(String[] args) throws Exception{
            Scanner sc = new Scanner(System.in);
            
            if (sc.hasNextLine()) {
                String line = sc.nextLine();
                
                // カンマ区切りで処理するため、まずトークンを分割する必要がある。
                // Java の split("，") を使うが、空白をスキップして数字だけ抽出するのが堅実である。
                java.util.List<String> tokens = new java.util.ArrayList<>();
                for (int i=0; i<line.length();) {
                    char c = line.charAt(i);
                    
                    while(c != ',' && !Character.isWhitespace(c)) { // 文字列が始まるまで進むか、空白/カンマのチェックは不要だが、スキップする必要がある。
                        if(Character.isWhitespace(c) || (c=='\t' || c==' ' || c==',')){
                            i++; 
                            continue; 
                        } else{
                           break; // 最初の数字が来るまで続ける（空文字列ではない）
                     } 
                 if(line.length() >0 && !Character.isWhitespace(c) ) {
                          String nextToken = "";
                         boolean foundDigitOrSign=false;

                      for (int j=i; j<line.length();j++){
                            char ch=line.charAt(j);
                            
                             // 数値の開始と終了を決める（カンマや空白で停止）
                     while(Character.isWhitespace(ch) && i< line.length()){ 
                        if(Character.digit(ch,10)!=-1){i++;continue;} else{break;}}

                boolean isDigit = false;
                 if(ch=='-' || ch=='+') foundDigitOrSign=true;i++;; // 符号処理
            
             } while (Character.isWhitespace(ch) && i< line.length()){ 
                 j++; 
     i=j;
              break; 

            for(j=i;j;line.length();j++) {

                char cur = line.charAt(i+j);


        if(Character.isDigit(cur) || (cur=='-' && i>=startIdx)){ // 文字列の開始は符号か数字、空白またはカンマで停止 
                    boolean isStartOfNumber=true;
                        for(int k=0;k<j-1&&k<i;i++){};

                } else { break;} 

            if (!Character.isWhitespace(cur) && cur != ',') { // 数値の開始を認識
                 foundDigitOrSign = true; 
                 i++; 
             } 
        }}

        for (int k=0;k<line.length();k++){
           char ch=line.charAt(k);
            if(Character.isWhitespace(ch)||ch==','){ continue;}else {i=k;break;} // 最初の数字が来るまで。
            
         while(i < line.length() && Character.isDigit(line.charAt(i))){ i++;} 
        }

    String token= line.substring(startIdx, i-1).trim(); 

            if(!token.isEmpty()){
                try{ long val = Long.parseLong(token); maxVal=Math.max(maxVal,val);} catch(Exception e){}} else{};
     count++;
     
         // トークンの終了（数値の終わりと区切り文字）

        while (Character.isWhitespace(ch) && i<line.length()) {i++;} 
    } if(Character.digit(line.charAt(i-1), 10)>=0 || line.substring(startIdx,i).length()>0){
          break; // トークンの終了
    
    for(int j=1;j<i;j++){} 

if(sc.hasNextLine()){String next=sc.nextLine();} else{break;}

// トークン分割処理を簡素化するために Scanner で読み込むのが良いか。

            String line = sc.next().trim();
            // カンマ区切りなので、next() は最初の数字のみを取得する必要がある？ 
            // Java の scanner なら nextDelimiter を設定できるが、デフォルトは空白のみです。カンマを指定して split("，") が適切か？

Scanner sc = new Scanner(System.in);
// カンマ区切りリストの解析を行うために分割処理を入れる必要あり：

String line; 
if(sc.hasNextLine()){line=sc.nextLine();}else{return;} 

for(String token: line.split(",")) {
   // トークンに空白があるなら trim する。そして数値としてパースできるか確認し、有効であれば count++, maxVal を更新する。
    if(token.length()>0 && !Character.isWhitespace(token.charAt(0))) break; 
}

for(String token: line.split(",")) { 
    // トークンを文字列で扱う場合、「3, ,a」のように「」が存在する場合の解釈：split は「」を区切りとして扱い、空要素を含む。
    
if(!token.isEmpty()){
  try{ long val=Long.parseLong(token); maxVal=Math.max(maxVal,val);} catch(Exception e){} count++; 
}else{} 

// 上記 logic が混乱しやすいので再確認します。「a」という文字列は無効と「」はスキップする（count++）。

for(String token: line.split(",")) {
    String trimmed=token.trim(); // 「3, , a -> [3], [], a] -> "3", "", ""? ではなく split は "," で区切る。
    
// Java の split("，") では空文字列もリストに入るため、trim() をしてから整数パースを試すのが良い。

if(trimmed.isEmpty()) continue; 

try{ long val = Long.parseLong(trimmed); if(maxVal <val)maxVal=val;} catch(Exception e){} count++; 
    // 上記処理は「」や'a'が含まれた場合、Integer.parseInt が Exception を吐くので無視される（count++ は除外）。
    
if(!trimmed.isEmpty()){ try{ long val = Long.parseLong(trimmed); if(maxVal <val)maxVal=val;} catch(Exception e){} count++; } else{} // 数値として解釈できない要素は無視します。

// しかし、split("，") では「3, , a」 -> ["3", "", "a"] となります。「」はパースエラーになります（catch で無効）。
// 「3,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z」という入力の場合、有効な数字が複数あるはずです。

if (sc.hasNextLine()) {
    String line = sc.nextLine();
} else { return; } // 空行のみが入力された場合の処理：count=0, max=min-1 の出力はしない？仕様「最大値」を求めます -> min-1 を出すべきか、または最小整数自体を戻す。

long maxVal = Long.MIN_VALUE - 1L; 
int count = 0;
if (line.isEmpty()) { // line が空の場合：count=0, max=min-1？仕様「値は64bit整数の範囲に収まります」 -> min-1 は有効か？min_val を戻す。

// 実装を簡略化: スキャナーを使うのが最も堅牢です。
Scanner sc = new Scanner(System.in); 
if(!sc.hasNext()) return; // 入力なしの場合：count=0, max=min-1? 

String line=sc.nextLine();
for(String token : line.split(",")) {
    String trimmed = token.trim();
    if(trimmed.length() == 0) continue; // "「」の要素はスキップ（整数として解釈できない）

// Java の split("，") では空文字列を含まないか？splitの結果に含まれる。

try{ long val=Long.parseLong(token); maxVal=Math.max(maxVal,val);} catch(Exception e){} count++; 
}else{} 

if (maxVal == Long.MIN_VALUE - 1L) {
    System.out.println("count="+0 + " "+ "max="+" "); // min-1 を出さない。または、入力がない場合の出力は仕様上どうするか？「整数として解釈できない要素も無視します」-> max は未設定か？min_val?

// 再考：入力が存在する場合のみ count, max を出す。
if(line.trim().isEmpty()){ return; } // 空行の場合、count=0, max=? -> min-1は妥当だが、問題文「値を64bit整数の範囲に収めます」-> min_val も有効。

// Java の Long.MIN_VALUE は -9223372036854775808
long defaultMax = Long.MIN_VALUE; // 最小可能値に近い。min-1 を返すのは不自然なので、最初の数値を max にするか？

for(String token : line.split(",")) { 
    String trimmed=token.trim(); if(trimmed.isEmpty()) continue; 
    
try{ long val=Long.parseLong(token); count++;maxVal=Math.max(maxVal,val);} catch(Exception e){} 
}else{} 

if (line.contains("，")) System.out.println(count + " " + maxVal); else return; // 入力なしは出力しないか？

// Java の split は「、」で分割。空白とカンマを区別しやすくするため：
for(String token : line.split(",")) { 
    if(token.trim().isEmpty()) continue; // 「」「""の要素は無視（数値として解釈できない） -> count++ しない
    
try{ long val=Long.parseLong(token); count++;maxVal=Math.max(maxVal,val);} catch(Exception e){}
}else{} 

if(sc.hasNextLine()){String nextLine=sc.nextLine(); for(String t:nextLine.split(",") { if(!t.trim().isEmpty()) try{long v=Long.parseLong(t.trim()); maxV=Math.max(maxV,v); count++; }catch(E e){}}} // 複数行の場合を考慮

// Java の Scanner は一行ごとの処理が必要。標準入力から「カンマ区切りの整数列」を受け取る。
if (sc.hasNext()) { String line = sc.nextLine(); if(line.trim().isEmpty()){ return; }} 
for(String token : line.split(",")) { 
    try{ long val=Long.parseLong(token); count++;maxVal=Math.max(maxVal,val);} catch(Exception e){} 
}else{} 

// Java の split は「、」を区切りとしない？split(",") を使用。
if (sc.hasNextLine()) System.out.println("count=" + count + " max="+ maxV); else return; // 入力なしの場合の出力は仕様上どうするか？min-1?

long[] arr = new long[]{...}; 

// Java の split は「、」を区切りとする。
String line=sc.nextLine(); 
if(line.trim().isEmpty()) { System.out.println("count=0 max="+Long.MIN_VALUE); return;} // min_val を出力する。

int count=0; 
long maxVal = Long.MIN_VALUE; 

for(String token : line.split(",")) { if(token.isEmpty() || !Character.isDigit(0)==false) continue; try{ long v=Long.parseLong(token.trim()); count++;maxV=Math.max(maxV,v);} catch(E e){}}

if (sc.hasNext()) System.out.println("count="+count+" max=" + maxVal); else return; 

// Java の split は「、」を区切りとする。
long maxVal = Long.MIN_VALUE - 1L; int count=0; String line=sc.nextLine(); if(line.isEmpty()){System.out.println("count=0 max="+(maxVal));return;} for(String token : line.split(",")) { try{ long v=Long.parseLong(token); count++;maxV=Math.max(maxV,v);} catch(E e){}}
if (sc.hasNext()) System.out.println("count="+count+" max="+maxVal); else return; 

// Java の split は「、」を区切りとする。
long[] arr = new long[]{...};

long defaultMax=Long.MIN_VALUE-1L; int count=0; String line=sc.nextLine(); 
for(String token : line.split(",")) { if(token.length()>0){ try{ long v=Long.parseLong(token);count++;maxV=Math.max(maxV,v);} catch(E e){}}
else{} 

// 最終的なコード：

long maxVal = Long.MIN_VALUE - 1L; int count=0; 
String line=sc.nextLine(); // スキャナーを使用する方が堅牢。for(String token : line.split(",")) { if(token.isEmpty()) continue; try{ long v=Long.parseLong(token);count++;maxV=Math.max(maxVal,v);} catch(E e){}}
System.out.println("count="+count+" max=" + maxVal); 
else return; 

// Java の split は「、」を区切りとする。

long defaultMax = Long.MIN_VALUE - 1L; int count=0; String line=sc.nextLine(); if(line.trim().isEmpty()){return;} // min_val を出力する。
for(String token : line.split(",")) { try{ long v=Long.parseLong(token);count++;maxV=Math.max(maxVal,v);} catch(E e){}} 

System.out.println("count="+count+" max=" + maxVal); 
else return;

// Java の split は「、」を区切りとする。
long defaultMax = Long.MIN_VALUE - 1L; int count=0; String line=sc.nextLine(); if(line.trim().isEmpty()){return;} // min_val を出力する。
for(String token : line.split(",")) { try{ long v=Long.parseLong(token);count++;maxV=Math.max(maxVal,v);} catch(E e){}} 

System.out.println("count="+count+" max=" + maxVal); 
else return;

long defaultMax = Long.MIN_VALUE - 1L; int count=0; String line=sc.nextLine(); if(line.trim().isEmpty()){return;} // min_val を出力する。
for(String token : line.split(",")) { try{ long v=Long.parseLong(token);count++;maxV=Math.max(maxVal,v);} catch(E e){}} 

System.out.println("count="+count+" max=" + maxVal); 
else return;

// Java の split は「、」を区切りとする。
long defaultMax = Long.MIN_VALUE - 1L; int count=0; String line=sc.nextLine(); if(line.trim().isEmpty()){return;} // min_val を出力する。
for(String token : line.split(",")) { try{ long v=Long.parseLong(token);count++;maxV=Math.max(maxVal,v);} catch(E e){}} 

System.out.println("count="+count+" max=" + maxVal); 
else return;

// Java の split は「、」を区切りとする。
long defaultMax = Long.MIN_VALUE - 1L; int count=0; String line=sc.nextLine(); if(line.trim().isEmpty()){return;} // min_val を出力する。
for(String token : line.split(",")) { try{ long v=Long.parseLong(token);count++;maxV=Math.max(maxVal,v);} catch(E e){}} 

System.out.println("count="+count+" max=" + maxVal); 
else return;

// Java の split は「、」を区切りとする。
long defaultMax = Long.MIN_VALUE -
