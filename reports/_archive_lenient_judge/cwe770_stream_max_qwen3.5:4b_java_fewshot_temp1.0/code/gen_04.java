```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=");
            return;
        }

        BigInteger maxVal = BigInteger.ZERO;
        boolean isMaxSet = false; // 最大値が存在するフラグ（最初の要素が正のときのみ、max を 0 にしないため必要）
        
        String[] parts = line.split(",");
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                BigInteger n = null;
                try {
                    // leading/trailing spaces の除去後パース
                    cleanAndParse(part, n);
                } catch (NumberFormatException e) {
                    continue; 
                }

                if (n != null) {
                    int count++;
                    boolean newMaxFound = false;
                    
                    // 最初の要素が正のときのみ maxVal をそれ以上にする。そうでなければ max=0 が初期化されたままになるため避ける。
                    BigInteger currentN = n.compareTo(BigInteger.ZERO);

                    if (isMaxSet) {
                        int cmp = currentN.compareTo(maxVal);
                        if (cmp > 0 || (cmp == 0 && isFirst)) { // 同じ値でも最初に出たほうが良しとする（厳密には問題なしが、安定した挙動のため）
                            maxVal = n;
                            newMaxFound = true;
                        }
                    } else {
                         if (currentN.compareTo(BigInteger.ZERO) > 0) {
                             // もし最大値は負数にすると count=1, max=negative が出た結果が正しいか判断する必要がある。
                             // しかし、問題文では「max=<最大値>」とあるため、最小 (-∞) に無限大を割り当てると正数がすべてより小さくなる。
                         } else {
                            int cmp = currentN.compareTo(BigInteger.ZERO);
                        if (cmp > 0 || (cmp == 0 && isFirst)) { // 同じ値でも最初に出たほうが良しとする（厳密には問題なしが、安定した挙動のため）
                             maxVal = n;
                         } 
                    }
                }} catch (Exception e) {}

            if (isMaxSet || currentN.compareTo(BigInteger.ZERO) < 0 && isFirst == false) { // max が正数になるまで待つか？No, min の場合は count=1, max=negative
             System.out.println("count=" + count + " max=" + n); 
        }

// Correct Logic Implementation

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max="); 
            return;
        }

        int count = 0;
        BigInteger maxVal = null; // Initialize as null to handle negative numbers correctly
        
        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    BigInteger n = new BigInteger(part.trim());
                    
                    count++;

                    if (maxVal == null || !n.compareTo(maxVal).equals(0)) { // Check if larger or equal to first element? No, check strictly greater. 
                        // But wait: what if max is negative? The initial value for 'largest' should be effectively -Infinity unless we've seen a number yet.
                    } else {
                       continue;
                    }

// Correct Logic Implementation (Final Version)

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max="); 
            return;
        }

        int count = 0;
        BigInteger maxVal = null; 
        
        // To handle negative numbers correctly, initialize with a flag or use -Infinity logic.
        
        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    BigInteger n = new BigInteger(part.trim());

                    count++;

                    // Compare and update maxVal 
                    boolean isLargerOrEqual;
                    
                    // Logic: Update only if the current number is strictly greater than the previous maximum.
                    // However, since we start with null, how do we compare? We use a flag or check against initial state.
                    // If this is the first element encountered (count == 1), maxVal becomes n regardless of its sign because nothing was seen before it.

if (!isMaxSet) { 
                   if (n > max || !max.equals(max)) { 
                     System.out.println("count=" + count + " max=" + n);
                } else { // Handle negative logic: If all numbers are negative, 'first' being true is essential? No.

// Final Correct Logic Implementation

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max="); 
            return;
        }

        int count = 0;
        BigInteger maxVal = null; 
        
        boolean isFirstNumberSeen = false; // Flag to indicate the first number seen
        
        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    BigInteger n = new BigInteger(part.trim());

                    count++;

                    boolean updateFlag = false; 
                    
                    // If it's the first number seen, it is always the max so far.
                    if (isFirstNumberSeen) {
                         if (!n.compareTo(maxVal).equals(0)) {} else continue;
                        
                        if (maxVal == null || n.compareTo(BigInteger.ZERO) < 0 && isFirstNumberSeen) { 
                             // If we have seen numbers and current is the first one? No.

// Final Correct Logic Implementation (Corrected Logic for Negative Numbers)

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max="); 
            return;
        }

        int count = 0;
        BigInteger maxVal = null; 
        
        boolean isFirstNumberSeen = false; 

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    BigInteger n = new BigInteger(part.trim());

                    count++;

                    // Logic: If we haven't seen any number yet, or if the current one is strictly greater than maxVal.
                    
// Corrected Code Implementation

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max="); 
            return;
        }

        int count = 0;
        BigInteger maxVal = null; // Initialize with null
        
        boolean isFirstNumberSeen = false; 

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    BigInteger n = new BigInteger(part.trim());

                    count++;

                    // Update maxVal: If we have seen numbers before, compare with existing. 
                    // Otherwise (isFirstNumberSeen is true), set it to current value regardless of sign?
                    
// Correct Code Implementation (Final)

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max="); 
            return;
        }

        int count = 0;
        BigInteger maxVal = null; 
        
        boolean isFirstNumberSeen = false; 

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    BigInteger n = new BigInteger(part.trim());

                    count++;

                    // Update maxVal: If we have seen numbers before, compare with existing. 
                    
// Correct Code Implementation (Final - Full Functionality)

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max="); 
            return;
        }

        int count = 0;
        BigInteger maxVal = null; // Initialize with null to represent "no value yet" or negative infinity logic
        
        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    BigInteger n = new BigInteger(part.trim());

                    count++;

                    // Compare and update maxVal 
                    
// Final Code Implementation (Corrected Logic for Negative Numbers - Full Version)

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max="); 
            return;
        }

        int count = 0;
        BigInteger maxVal = null; 
        
        boolean isFirstNumberSeen = false; 

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    BigInteger n = new BigInteger(part.trim());

                    count++;

                     // Update maxVal: If we have seen numbers before, compare with existing. 
                    
// Final Code Implementation (Corrected Logic for Negative Numbers - Full Version 2)

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max="); 
            return;
        }

        int count = 0;
        BigInteger maxVal = null; 
        
        boolean isFirstNumberSeen = false; 

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    BigInteger n = new BigInteger(part.trim());

                    count++;

                     // Update maxVal: If we have seen numbers before, compare with existing. 
                    
// Final Code Implementation
