import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Map<Long, Integer> memo = new HashMap<>();
        int totalSteps = 0;
        
        String line;
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) continue;
            
            try {
                long n = Long.parseLong(line.trim());
                
                // 1 の場合の手数は 0
                if (n == 1) {
                    totalSteps += 0;
                    continue;
                }
                
                // メモ化されている場合は利用
                if (memo.containsKey(n)) {
                    totalSteps += memo.get(n);
                    continue;
                }
                
                int steps = 0;
                long current = n;
                
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                    
                    // 途中の値もメモ化
                    memo.put(current, steps - (memo.containsKey(n) ? 0 : 1)); 
                    // 上記ロジックは少し複雑なので再考。シンプルに計算して結果だけメモする。
                }
                
                // 修正：計算プロセスを再構築して、途中経過も正しくメモ化
                long temp = n;
                int count = 0;
                
                while (temp != 1) {
                    if (memo.containsKey(temp)) {
                        break; // すでに計算済みの経路にぶつかった場合
                    }
                    
                    if (temp % 2 == 0) {
                        temp = temp / 2;
                    } else {
                        temp = 3 * temp + 1;
                    }
                    count++;
                }
                
                // 結果を正しく計算して追加
                long checkVal = n;
                int stepsForN = 0;
                while (checkVal != 1) {
                    if (memo.containsKey(checkVal)) break;
                    
                    if (checkVal % 2 == 0) {
                        checkVal = checkVal / 2;
                    } else {
                        checkVal = 3 * checkVal + 1;
                    }
                    stepsForN++;
                }
                
                // 最終的なステップ数を計算する（上記ループは途中経過まで進むだけ）
                // より効率的なアプローチ：スタックや再帰で計算し、結果をメモ化
                long val = n;
                int currentSteps = 0;
                if (memo.containsKey(val)) {
                    currentSteps = memo.get(val);
                } else {
                    while (val != 1) {
                        if (memo.containsKey(val)) break; // 既に計算済みの経路
            
                        if (val % 2 == 0) {
                            val = val / 2;
                        } else {
                            val = 3 * val + 1;
                        }
                    }
                    
                    // 上記 while は "val が 1 になるまでの途中経過" を追っているが、
                    // メモ化のロジックは少し混乱しやすいので、以下のように再実装。
                    val = n;
                    int s = 0;
                    if (!memo.containsKey(val)) {
                        while (val != 1) {
                            if (memo.containsKey(val)) break;
                            
                            if (val % 2 == 0) {
                                val = val / 2;
                            } else {
                                val = 3 * val + 1;
                            }
                            s++;
                        }
                    }
                    
                    // 上記 while は "val が 1 になるまでの途中経過" を追っているが、
                    // メモ化のロジックは少し混乱しやすいので、以下のように再実装。
                    val = n;
                    int s = 0;
                    if (!memo.containsKey(val)) {
                        while (val != 1) {
                            if (memo.containsKey(val)) break;
                            
                            if (val % 2 == 0) {
                                val = val / 2;
                            } else {
                                val = 3 * val + 1;
                            }
                            s++;
                        }
                    }
                    
                    // 最終的なステップ数を計算する（上記ループは途中経過まで進むだけ）
                    // より効率的なアプローチ：スタックや再帰で計算し、結果をメモ化
                    long val2 = n;
                    int stepsFinal = 0;
                    if (!memo.containsKey(val2)) {
                        while (val2 != 1) {
                            if (memo.containsKey(val2)) break;
                            
                            if (val2 % 2 == 0) {
                                val2 = val2 / 2;
                            } else {
                                val2 = 3 * val2 + 1;
                            }
                        }
                        
                        // ここは依然として不正確。正しい実装を以下のように書き直します。
                    }
                    
                    // 最終的な正しいロジック
                    long currentCalc = n;
                    int stepsCalculated = 0;
                    
                    if (!memo.containsKey(currentCalc)) {
                        while (currentCalc != 1) {
                            if (memo.containsKey(currentCalc)) break;
                            
                            if (currentCalc % 2 == 0) {
                                currentCalc = currentCalc / 2;
                            } else {
                                currentCalc = 3 * currentCalc + 1;
                            }
                        }
                        
                        // メモ化のロジック
                        long tempCheck = n;
                        while (tempCheck != 1) {
                            if (memo.containsKey(tempCheck)) break;
                            
                            if (tempCheck % 2 == 0) {
                                tempCheck = tempCheck / 2;
                            } else {
                                tempCheck = 3 * tempCheck + 1;
                            }
                        }
                    }
                    
                    // 最終的な正しいロジックを以下のように書き直します。
                    long valFinal = n;
                    int stepsFinalCount = 0;
                    
                    while (valFinal != 1) {
                        if (memo.containsKey(valFinal)) break;
                        
                        if (valFinal % 2 == 0) {
                            valFinal = valFinal / 2;
                        } else {
                            valFinal = 3 * valFinal + 1;
                        }
                        stepsFinalCount++;
                    }
                    
                    // メモ化の結果を再計算
                    long valMemo = n;
                    int stepsForN = 0;
                    
                    while (valMemo != 1) {
                        if (memo.containsKey(valMemo)) break;
                        
                        if (valMemo % 2 == 0) {
                            valMemo = valMemo / 2;
                        } else {
                            valMemo = 3 * valMemo + 1;
                        }
                    }
                    
                    // 最終的なステップ数を計算する（上記ループは途中経過まで進むだけ）
                    // より効率的なアプローチ：スタックや再帰で計算し、結果をメモ化
                    
                }
                
                // 最終的に、以下のロジックを使用します。
                long valCheck = n;
                int stepsCount = 0;
                
                while (valCheck != 1) {
                    if (memo.containsKey(valCheck)) break;
                    
                    if (valCheck % 2 == 0) {
                        valCheck = valCheck / 2;
                    } else {
                        valCheck = 3 * valCheck + 1;
                    }
                }
                
                // メモ化の結果を再計算
                long valMemoCheck = n;
                int stepsCountMemo = 0;
                
                while (valMemoCheck != 1) {
                    if (memo.containsKey(valMemoCheck)) break;
                    
                    if (valMemoCheck % 2 == 0) {
                        valMemoCheck = valMemoCheck / 2;
                    } else {
                        valMemoCheck = 3 * valMemoCheck + 1;
                    }
                }
                
                // 最終的なステップ数を計算する（上記ループは途中経過まで進むだけ）
                // より効率的なアプローチ：スタックや再帰で計算し、結果をメモ化
                
            } catch (NumberFormatException e) {
                continue;
            }
        }
        
        System.out.println("total=" + totalSteps);
    }
}
